'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from './layout';
import { requestGQL } from '../../lib/graphql-client';
import {
  MY_PROPERTIES_QUERY,
  RECEIVED_APPLICATIONS_QUERY,
  MY_APPLICATIONS_QUERY,
  MY_TENANCIES_QUERY,
  MY_DISPUTES_QUERY,
  MY_NOTIFICATIONS_QUERY,
} from '../../graphql/operations';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import {
  FileText,
  Wrench,
  DollarSign,
  ChevronRight,
  Plus,
  ArrowRight,
  MapPin,
  Calendar,
  CreditCard,
  Key,
  Bell,
  ClipboardList,
  Megaphone,
  BarChart3,
  HelpCircle,
  Users,
  Building2,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { isLandlord } from '../../lib/utils';

export default function DashboardPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const landlordMode = isLandlord(user);

  const [loading, setLoading] = useState(true);

  // Landlord stats
  const [totalProperties, setTotalProperties] = useState(0);
  const [pendingApplicationsCount, setPendingApplicationsCount] = useState(0);
  const [activeTenanciesCount, setActiveTenanciesCount] = useState(0);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);

  // Tenant stats
  const [tenantActiveTenanciesCount, setTenantActiveTenanciesCount] = useState(0);
  const [tenantPendingApplicationsCount, setTenantPendingApplicationsCount] = useState(0);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [currentTenancy, setCurrentTenancy] = useState<any>(null);

  useEffect(() => {
    if (!userLoading && user) {
      loadDashboardData();
    }
  }, [user, userLoading]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      if (landlordMode) {
        // Fetch Landlord data
        const [propsRes, receivedAppsRes, tenanciesRes] = await Promise.all([
          requestGQL(MY_PROPERTIES_QUERY).catch(() => ({ myProperties: [] })),
          requestGQL(RECEIVED_APPLICATIONS_QUERY).catch(() => ({ receivedApplications: [] })),
          requestGQL(MY_TENANCIES_QUERY).catch(() => ({ myTenancies: [] })),
        ]);

        const myProps = propsRes?.myProperties || [];
        const receivedApps = receivedAppsRes?.receivedApplications || [];
        const myTenancies = tenanciesRes?.myTenancies || [];

        setTotalProperties(myProps.length);
        setPendingApplicationsCount(receivedApps.filter((a: any) => a.status === 'PENDING').length);
        setActiveTenanciesCount(myTenancies.length);
        setRecentApplications(receivedApps.slice(0, 4));
      } else {
        // Fetch Tenant data
        const [myAppsRes, tenanciesRes, notificationsRes, disputesRes] = await Promise.all([
          requestGQL(MY_APPLICATIONS_QUERY).catch(() => ({ myApplications: [] })),
          requestGQL(MY_TENANCIES_QUERY).catch(() => ({ myTenancies: [] })),
          requestGQL(MY_NOTIFICATIONS_QUERY).catch(() => ({ myNotifications: [] })),
          requestGQL(MY_DISPUTES_QUERY).catch(() => ({ myDisputes: [] })),
        ]);

        const myApps = myAppsRes?.myApplications || [];
        const myTenancies = tenanciesRes?.myTenancies || [];
        const myNotifications = notificationsRes?.myNotifications || [];
        const myDisputes = disputesRes?.myDisputes || [];

        setTenantActiveTenanciesCount(myTenancies.length);
        setTenantPendingApplicationsCount(myApps.filter((a: any) => a.status === 'PENDING').length);
        setUnreadNotificationsCount(myNotifications.filter((n: any) => !n.read).length);

        if (myTenancies.length > 0) {
          setCurrentTenancy(myTenancies[0]);
        }

        // Build a dynamic list of recent activities for tenant
        const activities: any[] = [];

        myApps.slice(0, 2).forEach((app: any) => {
          activities.push({
            id: app.id,
            type: 'APPLICATION',
            title: `Application for ${app.property.title}`,
            subtitle: `Submitted on ${new Date(app.createdAt).toLocaleDateString()}`,
            status: app.status,
            link: '/app/applications',
            icon: <FileText size={16} />,
          });
        });

        myDisputes.slice(0, 2).forEach((disp: any) => {
          activities.push({
            id: disp.id,
            type: 'DISPUTE',
            title: `Dispute: ${disp.title}`,
            subtitle: `Created on ${new Date(disp.createdAt).toLocaleDateString()}`,
            status: disp.status,
            link: `/app/disputes/${disp.id}`,
            icon: <AlertTriangle size={16} className="text-amber-500" />,
          });
        });

        setRecentActivities(activities.slice(0, 4));
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (actionName: string) => {
    toast.info(`"${actionName}" is ready for you.`);
  };

  if (userLoading || loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-2xl bg-zinc-200" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-96 rounded-2xl bg-zinc-200" />
          <Skeleton className="h-96 rounded-2xl bg-zinc-200" />
        </div>
      </div>
    );
  }

  const userName = user?.firstName || 'User';

  if (landlordMode) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
        {/* 1. Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Properties */}
          <Link href="/app/properties">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm transition-all text-left cursor-pointer">
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-2">
                  Total Properties
                </div>
                <div className="text-3xl font-black text-primary leading-none">
                  {totalProperties}
                </div>
              </div>
              <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Building2 size={20} />
              </div>
            </div>
          </Link>

          {/* Pending Applications */}
          <Link href="/app/applications">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm transition-all text-left cursor-pointer">
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-2">
                  Pending Applications
                </div>
                <div className="text-3xl font-black text-amber-500 leading-none">
                  {pendingApplicationsCount}
                </div>
              </div>
              <div className="h-11 w-11 rounded-full bg-amber-50 text-[#f0af2f] flex items-center justify-center shrink-0">
                <ClipboardList size={20} />
              </div>
            </div>
          </Link>

          {/* Active Tenancies */}
          <Link href="/app/tenancies">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm transition-all text-left cursor-pointer">
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-2">
                  Active Tenancies
                </div>
                <div className="text-3xl font-black text-primary leading-none">
                  {activeTenanciesCount}
                </div>
              </div>
              <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Users size={20} />
              </div>
            </div>
          </Link>
        </div>

        {/* 2. Main Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Recent Activity Table */}
          <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs text-left">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
              <h3 className="text-base font-bold text-slate-800">Recent Applications</h3>
              <Link
                href="/app/applications"
                className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                View All <ArrowRight size={12} />
              </Link>
            </div>

            {recentApplications.length === 0 ? (
              <div className="text-center py-12 text-xs text-zinc-400 font-semibold">
                No recent applications received yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider">
                      <th className="pb-3 font-bold">Property Name</th>
                      <th className="pb-3 font-bold">Applicant Name</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {recentApplications.map((app) => (
                      <tr
                        key={app.id}
                        onClick={() => router.push('/app/applications')}
                        className="hover:bg-zinc-50/50 transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-zinc-100 bg-zinc-100">
                            <Image
                              src={app.property.image}
                              alt={app.property.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-bold text-slate-700 group-hover:text-primary transition-colors">
                            {app.property.title}
                          </span>
                        </td>
                        <td className="py-3.5 text-zinc-500 font-bold">
                          {app.tenant.firstName} {app.tenant.lastName}
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              app.status === 'PENDING'
                                ? 'bg-amber-50 text-[#e69312] border-amber-100'
                                : app.status === 'APPROVED'
                                  ? 'bg-primary/10 text-primary border-primary/20'
                                  : 'bg-red-50 text-red-650 border-red-100'
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-zinc-400 font-medium">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Column: Fast Actions & Upcoming Inspections */}
          <div className="space-y-6 text-left">
            {/* Card 1: Fast Actions */}
            <div className="bg-secondary border border-primary/20 rounded-2xl p-5 shadow-2xs text-white space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-primary">
                Fast Actions
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/app/properties/new">
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer h-full">
                    <Plus size={16} className="text-primary" />
                    <span className="text-[10px] font-bold">Add Property</span>
                  </div>
                </Link>

                <button
                  onClick={() => handleQuickAction('Make Announcement')}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer h-full"
                >
                  <Megaphone size={16} className="text-primary" />
                  <span className="text-[10px] font-bold">Announce</span>
                </button>

                <button
                  onClick={() => handleQuickAction('View Reports')}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer h-full"
                >
                  <BarChart3 size={16} className="text-primary" />
                  <span className="text-[10px] font-bold">Reports</span>
                </button>

                <button
                  onClick={() => handleQuickAction('Get Support')}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer h-full"
                >
                  <HelpCircle size={16} className="text-primary" />
                  <span className="text-[10px] font-bold">Support</span>
                </button>
              </div>
            </div>

            {/* Upcoming Inspections */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
              <h4 className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-widest leading-none mb-1">
                Upcoming Inspections
              </h4>
              <div className="space-y-3">
                <div
                  onClick={() => handleQuickAction('Inspection Schedule')}
                  className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all cursor-pointer text-left"
                >
                  <div className="h-9 w-9 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center shrink-0 border border-zinc-200/40">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-700 leading-snug">
                      Property Walkthrough
                    </h5>
                    <span className="text-[9px] text-zinc-400 font-bold">Configure schedule</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tenant View
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* 1. Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-primary/20">
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 translate-y-16 w-48 h-48 rounded-full bg-yellow-500/5 blur-2xl pointer-events-none" />

        <div className="space-y-2 z-10 text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {userName}!
          </h2>
          <p className="text-xs sm:text-sm text-zinc-450 font-medium">
            Everything is looking good with your tenancies today.
          </p>
        </div>

        <Link href="/app/properties" className="z-10 self-start md:self-auto">
          <Button className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all border border-primary/30 cursor-pointer">
            <Plus size={16} strokeWidth={3} />
            Find New Property
          </Button>
        </Link>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Active Tenancy */}
        <Link href="/app/tenancies">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all text-left cursor-pointer">
            <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Key size={20} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
                Active Tenancy
              </div>
              <div className="text-2xl font-black text-slate-800 leading-none">
                {tenantActiveTenanciesCount}
              </div>
            </div>
          </div>
        </Link>

        {/* Pending Applications */}
        <Link href="/app/applications">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all text-left cursor-pointer">
            <div className="h-11 w-11 rounded-full bg-amber-50 text-[#f0af2f] flex items-center justify-center shrink-0">
              <ClipboardList size={20} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
                Pending Applications
              </div>
              <div className="text-2xl font-black text-slate-800 leading-none">
                {tenantPendingApplicationsCount}
              </div>
            </div>
          </div>
        </Link>

        {/* Unread Notifications */}
        <div
          onClick={() => handleQuickAction('Notifications')}
          className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all text-left cursor-pointer"
        >
          <div className="h-11 w-11 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <Bell size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
              Unread Notifications
            </div>
            <div className="text-2xl font-black text-slate-800 leading-none">
              {unreadNotificationsCount}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h3 className="text-base font-bold text-slate-800">Recent Activity</h3>
            </div>

            {recentActivities.length === 0 ? (
              <div className="text-center py-12 text-xs text-zinc-400 font-semibold">
                No recent activity to show. Explore and apply for properties to get started!
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivities.map((act) => (
                  <Link key={act.id} href={act.link}>
                    <div className="group flex items-center justify-between p-3.5 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all cursor-pointer mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-zinc-200/60 text-zinc-600 flex items-center justify-center shrink-0 group-hover:bg-zinc-200 transition-colors">
                          {act.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-700 leading-snug">
                            {act.title}
                          </h4>
                          <span className="text-[10px] text-zinc-400 font-medium">
                            {act.subtitle}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            act.status === 'PENDING' || act.status === 'OPEN'
                              ? 'bg-amber-50 text-[#e69312] border-amber-100'
                              : 'bg-primary/10 text-primary border-primary/20'
                          }`}
                        >
                          {act.status}
                        </span>
                        <ChevronRight
                          size={14}
                          className="text-zinc-400 group-hover:translate-x-0.5 transition-transform"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-zinc-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
              Need assistance? Support team is online
            </span>
          </div>
        </div>

        {/* Right column: Current Tenancy & Quick Actions */}
        <div className="space-y-6 text-left">
          {/* Current Tenancy card */}
          {currentTenancy ? (
            <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-2xs">
              <div className="relative h-40 w-full bg-zinc-100">
                <Image
                  src={currentTenancy.property.image}
                  alt={currentTenancy.property.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Current Tenancy
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-800">
                    {currentTenancy.property.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold">
                    <MapPin size={10} className="text-zinc-400" />
                    {currentTenancy.property.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-100 py-3">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">
                      Lease Commenced
                    </span>
                    <div className="text-xs font-bold text-primary flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(
                        currentTenancy.signedAgreementUrl ? currentTenancy.updatedAt : Date.now(),
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">
                      Monthly Rent
                    </span>
                    <div className="text-xs font-black text-slate-700">
                      GHC {currentTenancy.property.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <Link href={`/app/tenancies/${currentTenancy.id}`}>
                  <Button
                    variant="outline"
                    className="w-full text-xs rounded-xl font-bold border-zinc-200 hover:bg-zinc-50 cursor-pointer h-10 mt-1"
                  >
                    View Tenancy
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs space-y-4 text-center py-8">
              <div className="h-10 w-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 mx-auto">
                <Key size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800">No Active Lease</h4>
                <p className="text-[10px] text-zinc-450 font-medium leading-relaxed">
                  You do not have any active leases. Find a property and apply to get started.
                </p>
              </div>
              <Link href="/app/properties">
                <Button className="h-9 px-4 rounded-xl bg-primary text-xs font-bold mt-2 cursor-pointer w-full">
                  Browse Properties
                </Button>
              </Link>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-4">
            <h4 className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-widest leading-none mb-1">
              Quick Actions
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickAction('Pay Rent')}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all gap-2 text-center group cursor-pointer"
              >
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CreditCard size={16} />
                </div>
                <span className="text-[10px] font-bold text-slate-700">Pay Rent</span>
              </button>

              <button
                onClick={() => {
                  if (currentTenancy) {
                    router.push(`/app/disputes?tenancyId=${currentTenancy.id}`);
                  } else {
                    router.push('/app/disputes');
                  }
                }}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all gap-2 text-center group cursor-pointer"
              >
                <div className="h-9 w-9 rounded-full bg-amber-50 text-[#f0af2f] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <AlertTriangle size={16} />
                </div>
                <span className="text-[10px] font-bold text-slate-700">Raise Dispute</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
