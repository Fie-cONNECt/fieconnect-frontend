"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "./layout";
import { requestGQL } from "../../lib/graphql-client";
import {
  MY_PROPERTIES_QUERY,
  RECEIVED_APPLICATIONS_QUERY,
  MY_APPLICATIONS_QUERY,
  MY_TENANCIES_QUERY,
  MY_DISPUTES_QUERY,
  MY_NOTIFICATIONS_QUERY,
  MARK_NOTIFICATION_READ_MUTATION,
} from "../../graphql/operations";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import { StatCard, EmptyState } from "@/components/layout";
import { StatusBadge } from "@/components/ui/status-badge";
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
  X,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { isLandlord } from "../../lib/utils";

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
  const [tenantActiveTenanciesCount, setTenantActiveTenanciesCount] =
    useState(0);
  const [tenantPendingApplicationsCount, setTenantPendingApplicationsCount] =
    useState(0);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [currentTenancy, setCurrentTenancy] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [markingId, setMarkingId] = useState<string | null>(null);

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
          requestGQL(RECEIVED_APPLICATIONS_QUERY).catch(() => ({
            receivedApplications: [],
          })),
          requestGQL(MY_TENANCIES_QUERY).catch(() => ({ myTenancies: [] })),
        ]);

        const myProps = propsRes?.myProperties || [];
        const receivedApps = receivedAppsRes?.receivedApplications || [];
        const myTenancies = tenanciesRes?.myTenancies || [];

        setTotalProperties(myProps.length);
        setPendingApplicationsCount(
          receivedApps.filter((a: any) => a.status === "PENDING").length,
        );
        setActiveTenanciesCount(myTenancies.length);
        setRecentApplications(receivedApps.slice(0, 4));
      } else {
        // Fetch Tenant data
        const [myAppsRes, tenanciesRes, notificationsRes, disputesRes] =
          await Promise.all([
            requestGQL(MY_APPLICATIONS_QUERY).catch(() => ({
              myApplications: [],
            })),
            requestGQL(MY_TENANCIES_QUERY).catch(() => ({ myTenancies: [] })),
            requestGQL(MY_NOTIFICATIONS_QUERY).catch(() => ({
              myNotifications: [],
            })),
            requestGQL(MY_DISPUTES_QUERY).catch(() => ({ myDisputes: [] })),
          ]);

        const myApps = myAppsRes?.myApplications || [];
        const myTenancies = tenanciesRes?.myTenancies || [];
        const myNotifications = notificationsRes?.myNotifications || [];
        const myDisputes = disputesRes?.myDisputes || [];

        setTenantActiveTenanciesCount(myTenancies.length);
        setTenantPendingApplicationsCount(
          myApps.filter((a: any) => a.status === "PENDING").length,
        );
        setUnreadNotificationsCount(
          myNotifications.filter((n: any) => !n.read).length,
        );
        setNotifications(myNotifications);

        if (myTenancies.length > 0) {
          setCurrentTenancy(myTenancies[0]);
        }

        // Build a dynamic list of recent activities for tenant
        const activities: any[] = [];

        myApps.slice(0, 2).forEach((app: any) => {
          activities.push({
            id: app.id,
            type: "APPLICATION",
            title: `Application for ${app.property.title}`,
            subtitle: `Submitted on ${new Date(app.createdAt).toLocaleDateString()}`,
            status: app.status,
            link: "/app/applications",
            icon: <FileText size={16} />,
          });
        });

        myDisputes.slice(0, 2).forEach((disp: any) => {
          activities.push({
            id: disp.id,
            type: "DISPUTE",
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
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (actionName: string) => {
    toast.info(`"${actionName}" is ready for you.`);
  };

  const handleMarkNotificationRead = async (notif: any) => {
    setMarkingId(notif.id);
    try {
      await requestGQL(MARK_NOTIFICATION_READ_MUTATION, { id: notif.id });
      toast.success("Notification marked as read.");
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)),
      );
      setUnreadNotificationsCount((c) => Math.max(0, c - 1));

      if (notif.link && notif.link !== "#") {
        setShowNotificationsModal(false);
        router.push(notif.link);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to mark notification as read.");
    } finally {
      setMarkingId(null);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-2xl bg-muted" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-96 rounded-2xl bg-muted" />
          <Skeleton className="h-96 rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  const userName = user?.firstName || "User";

  if (landlordMode) {
    return (
      <div className="section-spacing max-w-7xl mx-auto animate-in fade-in duration-500">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Properties"
            value={totalProperties}
            href="/app/properties"
            tone="primary"
            icon={<Building2 size={20} />}
          />
          <StatCard
            label="Pending Applications"
            value={pendingApplicationsCount}
            href="/app/applications"
            tone="warning"
            icon={<ClipboardList size={20} />}
          />
          <StatCard
            label="Active Tenancies"
            value={activeTenanciesCount}
            href="/app/tenancies"
            tone="primary"
            icon={<Users size={20} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card-surface p-5 sm:p-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <h3 className="text-h4 text-foreground">Recent Applications</h3>
              <Link
                href="/app/applications"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-ui flex items-center gap-1"
              >
                View All <ArrowRight size={12} aria-hidden />
              </Link>
            </div>

            {recentApplications.length === 0 ? (
              <EmptyState
                icon={<ClipboardList size={16} />}
                title="No recent applications"
                description="When tenants apply to your listings, they will appear here."
                className="border-0 bg-transparent py-8"
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-[10px] font-extrabold uppercase text-muted-foreground tracking-wider">
                      <th className="pb-3 font-bold">Property Name</th>
                      <th className="pb-3 font-bold">Applicant Name</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentApplications.map((app) => (
                      <tr
                        key={app.id}
                        onClick={() => router.push("/app/applications")}
                        className="hover:bg-muted/50/50 transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-border bg-muted">
                            <Image
                              src={app.property.image}
                              alt={app.property.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {app.property.title}
                          </span>
                        </td>
                        <td className="py-3.5 text-muted-foreground font-bold">
                          {app.tenant.firstName} {app.tenant.lastName}
                        </td>
                        <td className="py-3.5">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="py-3.5 text-muted-foreground font-medium">
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
                  onClick={() => handleQuickAction("Make Announcement")}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer h-full"
                >
                  <Megaphone size={16} className="text-primary" />
                  <span className="text-[10px] font-bold">Announce</span>
                </button>

                <button
                  onClick={() => handleQuickAction("View Reports")}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer h-full"
                >
                  <BarChart3 size={16} className="text-primary" />
                  <span className="text-[10px] font-bold">Reports</span>
                </button>

                <button
                  onClick={() => handleQuickAction("Get Support")}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer h-full"
                >
                  <HelpCircle size={16} className="text-primary" />
                  <span className="text-[10px] font-bold">Support</span>
                </button>
              </div>
            </div>

            {/* Upcoming Inspections */}
            <div className="card-surface p-5 shadow-2xs space-y-4">
              <h4 className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-widest leading-none mb-1">
                Upcoming Inspections
              </h4>
              <div className="space-y-3">
                <div
                  onClick={() => handleQuickAction("Inspection Schedule")}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/50/50 hover:bg-muted/50 hover:border-border transition-all cursor-pointer text-left"
                >
                  <div className="h-9 w-9 rounded-lg bg-muted text-muted-foreground flex items-center justify-center shrink-0 border border-border/40">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-foreground leading-snug">
                      Property Walkthrough
                    </h5>
                    <span className="text-[9px] text-muted-foreground font-bold">
                      Configure schedule
                    </span>
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
    <div className="section-spacing max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-green-dark to-brand-green p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-primary/20">
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 translate-y-16 w-48 h-48 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

        <div className="space-y-2 z-10 text-left">
          <h2 className="text-h1 text-white">Welcome, {userName}!</h2>
          <p className="text-body text-white/70">
            Everything is looking good with your tenancies today.
          </p>
        </div>

        <Link href="/app/properties" className="z-10 self-start md:self-auto">
          <Button className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold flex items-center justify-center gap-1.5 shadow-sm transition-ui border border-primary/30 cursor-pointer">
            <Plus size={16} strokeWidth={3} aria-hidden />
            Find New Property
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Active Tenancy"
          value={tenantActiveTenanciesCount}
          href="/app/tenancies"
          tone="primary"
          icon={<Key size={20} />}
        />
        <StatCard
          label="Pending Applications"
          value={tenantPendingApplicationsCount}
          href="/app/applications"
          tone="warning"
          icon={<ClipboardList size={20} />}
        />
        <button
          type="button"
          onClick={() => setShowNotificationsModal(true)}
          className="text-left w-full"
        >
          <StatCard
            label="Unread Notifications"
            value={unreadNotificationsCount}
            tone="destructive"
            icon={<Bell size={20} />}
            className="cursor-pointer"
          />
        </button>
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Recent Activity */}
        <div className="lg:col-span-2 card-surface p-5 sm:p-6 shadow-2xs flex flex-col justify-between text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground">
                Recent Activity
              </h3>
            </div>

            {recentActivities.length === 0 ? (
              <div className="text-center py-12 text-xs text-muted-foreground font-semibold">
                No recent activity to show. Explore and apply for properties to
                get started!
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivities.map((act) => (
                  <Link key={act.id} href={act.link}>
                    <div className="group flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/50/50 hover:bg-muted/50 hover:border-border transition-all cursor-pointer mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-zinc-200/60 text-zinc-600 flex items-center justify-center shrink-0 group-hover:bg-zinc-200 transition-colors">
                          {act.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-foreground leading-snug">
                            {act.title}
                          </h4>
                          <span className="text-[10px] text-muted-foreground font-medium">
                            {act.subtitle}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            act.status === "PENDING" || act.status === "OPEN"
                              ? "bg-amber-50 text-[#e69312] border-amber-100"
                              : "bg-primary/10 text-primary border-primary/20"
                          }`}
                        >
                          {act.status}
                        </span>
                        <ChevronRight
                          size={14}
                          className="text-muted-foreground group-hover:translate-x-0.5 transition-transform"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-border pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
              Need assistance? Support team is online
            </span>
          </div>
        </div>

        {/* Right column: Current Tenancy & Quick Actions */}
        <div className="space-y-6 text-left">
          {/* Current Tenancy card */}
          {currentTenancy ? (
            <div className="card-surface overflow-hidden shadow-2xs">
              <div className="relative h-40 w-full bg-muted">
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
                  <h4 className="text-sm font-bold text-foreground">
                    {currentTenancy.property.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                    <MapPin size={10} className="text-muted-foreground" />
                    {currentTenancy.property.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-b border-border py-3">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider">
                      Lease Commenced
                    </span>
                    <div className="text-xs font-bold text-primary flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(
                        currentTenancy.signedAgreementUrl
                          ? currentTenancy.updatedAt
                          : Date.now(),
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider">
                      Monthly Rent
                    </span>
                    <div className="text-xs font-black text-foreground">
                      GHC {currentTenancy.property.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <Link href={`/app/tenancies/${currentTenancy.id}`}>
                  <Button
                    variant="outline"
                    className="w-full text-xs rounded-xl font-bold border-border hover:bg-muted/50 cursor-pointer h-10 mt-1"
                  >
                    View Tenancy
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="card-surface p-5 shadow-2xs space-y-4 text-center py-8">
              <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground mx-auto">
                <Key size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground">
                  No Active Lease
                </h4>
                <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                  You do not have any active leases. Find a property and apply
                  to get started.
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
          <div className="card-surface p-5 space-y-4">
            <h4 className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-widest leading-none mb-1">
              Quick Actions
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickAction("Pay Rent")}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-muted/50/50 hover:bg-muted/50 hover:border-border transition-all gap-2 text-center group cursor-pointer"
              >
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CreditCard size={16} />
                </div>
                <span className="text-[10px] font-bold text-foreground">
                  Pay Rent
                </span>
              </button>

              <button
                onClick={() => {
                  if (currentTenancy) {
                    router.push(`/app/disputes?tenancyId=${currentTenancy.id}`);
                  } else {
                    router.push("/app/disputes");
                  }
                }}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-muted/50/50 hover:bg-muted/50 hover:border-border transition-all gap-2 text-center group cursor-pointer"
              >
                <div className="h-9 w-9 rounded-full bg-amber-50 text-[#f0af2f] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <AlertTriangle size={16} />
                </div>
                <span className="text-[10px] font-bold text-foreground">
                  Raise Dispute
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showNotificationsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-lg space-y-5 text-left border border-border">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <div>
                <h3 className="text-sm font-black text-foreground">
                  Unread Notifications
                </h3>
                <p className="text-[10px] text-muted-foreground font-bold mt-0.5">
                  Click to view and mark as read.
                </p>
              </div>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="h-8 w-8 rounded-xl bg-muted hover:bg-zinc-200 flex items-center justify-center text-muted-foreground cursor-pointer transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 no-scrollbar">
              {notifications.filter((n) => !n.read).length === 0 ? (
                <div className="text-center py-8 text-xs text-muted-foreground font-semibold">
                  All caught up! No unread notifications.
                </div>
              ) : (
                notifications
                  .filter((n) => !n.read)
                  .map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleMarkNotificationRead(n)}
                      className="p-3.5 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl transition-all cursor-pointer text-left flex flex-col gap-1 relative group"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-foreground font-extrabold text-[11px] pr-6">
                          {n.title}
                        </span>
                        {markingId === n.id ? (
                          <Loader2 className="h-3 w-3 animate-spin text-primary" />
                        ) : (
                          <Check className="h-3 w-3 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                        {n.message}
                      </p>
                      <span className="text-[8px] text-muted-foreground mt-1">
                        {new Date(
                          parseInt(n.createdAt) || n.createdAt,
                        ).toLocaleString()}
                      </span>
                    </div>
                  ))
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-border">
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="text-xs font-bold text-muted-foreground hover:text-zinc-700 cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
