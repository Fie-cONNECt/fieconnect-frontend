'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from './layout';
import { Button } from '../../components/ui/button';
import {
  FileText,
  Wrench,
  DollarSign,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  Plus,
  ArrowRight,
  MapPin,
  Calendar,
  CreditCard,
  Briefcase,
  HelpCircle,
  Key,
  Bell,
  ClipboardList,
  Megaphone,
  BarChart3,
  Users,
  Home as HomeIcon,
  Building2,
} from 'lucide-react';
import { toast } from 'sonner';
import { isLandlord } from '../../lib/utils';

export default function DashboardPage() {
  const { user } = useUser();
  const isLandlordUser = isLandlord(user);
  const userName = user?.firstName || 'Kwesi';

  const handleQuickAction = (actionName: string) => {
    toast.success(`Action "${actionName}" triggered successfully!`);
  };

  if (isLandlordUser) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
        {/* 1. Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Total Properties */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm transition-all text-left">
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-2">
                Total Properties
              </div>
              <div className="text-3xl font-black text-emerald-700 leading-none">5</div>
            </div>
            <div className="h-11 w-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Building2 size={20} />
            </div>
          </div>

          {/* Card 2: Pending Applications */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm transition-all text-left">
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-2">
                Pending Applications
              </div>
              <div className="text-3xl font-black text-amber-500 leading-none">3</div>
            </div>
            <div className="h-11 w-11 rounded-full bg-amber-50 text-[#f0af2f] flex items-center justify-center shrink-0">
              <ClipboardList size={20} />
            </div>
          </div>

          {/* Card 3: Active Tenancies */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm transition-all text-left">
            <div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-2">
                Active Tenancies
              </div>
              <div className="text-3xl font-black text-emerald-600 leading-none">4</div>
            </div>
            <div className="h-11 w-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
          </div>
        </div>

        {/* 2. Main Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Recent Activity Table */}
          <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs text-left">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
              <h3 className="text-base font-bold text-slate-800">Recent Activity</h3>
              <button
                onClick={() => handleQuickAction('View All Activity')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
              >
                View All <ArrowRight size={12} />
              </button>
            </div>

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
                  {/* Row 1 */}
                  <tr
                    onClick={() => handleQuickAction('View Akosua Addo Application')}
                    className="hover:bg-zinc-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-zinc-100 bg-zinc-100">
                        <Image
                          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=200&auto=format&fit=crop"
                          alt="East Legon Penthouse"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-primary transition-colors">
                        East Legon Penthouse
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-500 font-bold">Akosua Addo</td>
                    <td className="py-3.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-[#e69312] border border-amber-100">
                        Pending
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-400 font-medium">Oct 24, 2023</td>
                  </tr>

                  {/* Row 2 */}
                  <tr
                    onClick={() => handleQuickAction('View Kofi Boateng Application')}
                    className="hover:bg-zinc-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-zinc-100 bg-zinc-100">
                        <Image
                          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=200&auto=format&fit=crop"
                          alt="Airport Residential Villa"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-primary transition-colors">
                        Airport Residential Villa
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-500 font-bold">Kofi Boateng</td>
                    <td className="py-3.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Approved
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-400 font-medium">Oct 22, 2023</td>
                  </tr>

                  {/* Row 3 */}
                  <tr
                    onClick={() => handleQuickAction('View Ama Serwaa Application')}
                    className="hover:bg-zinc-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-zinc-100 bg-zinc-100">
                        <Image
                          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=200&auto=format&fit=crop"
                          alt="Cantonments Studio"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-primary transition-colors">
                        Cantonments Studio
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-500 font-bold">Ama Serwaa</td>
                    <td className="py-3.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-[#e69312] border border-amber-100">
                        Pending
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-400 font-medium">Oct 20, 2023</td>
                  </tr>

                  {/* Row 4 */}
                  <tr
                    onClick={() => handleQuickAction('View Kwame Nkrumah Application')}
                    className="hover:bg-zinc-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-zinc-100 bg-zinc-100">
                        <Image
                          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=200&auto=format&fit=crop"
                          alt="Ridge Luxury Townhouse"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-primary transition-colors">
                        Ridge Luxury Townhouse
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-500 font-bold">Kwame Nkrumah</td>
                    <td className="py-3.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Approved
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-400 font-medium">Oct 18, 2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Fast Actions & Upcoming Inspections */}
          <div className="space-y-6 text-left">
            {/* Card 1: Fast Actions */}
            <div className="bg-[#0a583e] border border-[#095038] rounded-2xl p-5 shadow-2xs text-white space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-200">
                Fast Actions
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {/* Invoice Button */}
                <button
                  onClick={() => handleQuickAction('Manage Invoices')}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer"
                >
                  <FileText size={16} className="text-emerald-300" />
                  <span className="text-[10px] font-bold">Invoices</span>
                </button>

                {/* Announce Button */}
                <button
                  onClick={() => handleQuickAction('Make Announcement')}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer"
                >
                  <Megaphone size={16} className="text-emerald-300" />
                  <span className="text-[10px] font-bold">Announce</span>
                </button>

                {/* Reports Button */}
                <button
                  onClick={() => handleQuickAction('View Reports')}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer"
                >
                  <BarChart3 size={16} className="text-emerald-300" />
                  <span className="text-[10px] font-bold">Reports</span>
                </button>

                {/* Support Button */}
                <button
                  onClick={() => handleQuickAction('Get Support')}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all gap-2 text-center border border-white/5 cursor-pointer"
                >
                  <HelpCircle size={16} className="text-emerald-300" />
                  <span className="text-[10px] font-bold">Support</span>
                </button>
              </div>
            </div>

            {/* Card 2: Upcoming Inspections */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
              <h4 className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-widest leading-none mb-1">
                Upcoming Inspections
              </h4>
              <div className="space-y-3">
                {/* Inspection 1 */}
                <div
                  onClick={() => handleQuickAction('View East Legon Inspection details')}
                  className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all cursor-pointer text-left"
                >
                  <div className="h-9 w-9 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center shrink-0 border border-zinc-200/40">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-700 leading-snug">
                      East Legon Penthouse
                    </h5>
                    <span className="text-[9px] text-zinc-400 font-bold">Tomorrow, 10:00 AM</span>
                  </div>
                </div>

                {/* Inspection 2 */}
                <div
                  onClick={() => handleQuickAction('View Ridge Inspection details')}
                  className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all cursor-pointer text-left"
                >
                  <div className="h-9 w-9 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center shrink-0 border border-zinc-200/40">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-700 leading-snug">
                      Ridge Townhouse
                    </h5>
                    <span className="text-[9px] text-zinc-400 font-bold">Friday, 02:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Footer Banner */}
        {/* <footer className="w-full pt-10 border-t border-zinc-200/75 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              FieConnect
            </div>
            <p className="text-[10px] text-zinc-400 font-semibold">
              © 2026 FieConnect Ghana. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold text-zinc-400 tracking-wide uppercase">
            <Link href="#" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">
              Contact Support
            </Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">
              Careers
            </Link>
          </div>
        </footer> */}
      </div>
    );
  }

  // Tenant View (default)
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* 1. Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#03442d] to-[#0a583e] p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#045037]">
        {/* Abstract design elements */}
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 translate-y-16 w-48 h-48 rounded-full bg-yellow-500/5 blur-2xl pointer-events-none" />

        <div className="space-y-2 z-10 text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {userName}!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
            Everything is looking good with your tenancies today.
          </p>
        </div>

        <Link href="/" className="z-10 self-start md:self-auto">
          <Button className="h-11 px-5 rounded-xl bg-[#fbbd3f] hover:bg-[#eab335] text-slate-900 font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all border border-[#f0af2f] cursor-pointer">
            <Plus size={16} strokeWidth={3} />
            Find New Property
          </Button>
        </Link>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Active Tenancy */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all text-left">
          <div className="h-11 w-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Key size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
              Active Tenancy
            </div>
            <div className="text-2xl font-black text-slate-800 leading-none">1</div>
          </div>
        </div>

        {/* Card 2: Pending Applications */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all text-left">
          <div className="h-11 w-11 rounded-full bg-amber-50 text-[#f0af2f] flex items-center justify-center shrink-0">
            <ClipboardList size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
              Pending Applications
            </div>
            <div className="text-2xl font-black text-slate-800 leading-none">2</div>
          </div>
        </div>

        {/* Card 3: Unread Notifications */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all text-left">
          <div className="h-11 w-11 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <Bell size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
              Unread Notifications
            </div>
            <div className="text-2xl font-black text-slate-800 leading-none">5</div>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h3 className="text-base font-bold text-slate-800">Recent Activity</h3>
              <button
                onClick={() => handleQuickAction('View All Activity')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {/* Activity item 1: Pending */}
              <div
                onClick={() => handleQuickAction('View Application Details')}
                className="group flex items-center justify-between p-3.5 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-zinc-200/60 text-zinc-600 flex items-center justify-center shrink-0 group-hover:bg-zinc-200 transition-colors">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 leading-snug">
                      Application for Apartment in Osu
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      Submitted on Oct 12, 2023
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-[#e69312] border border-amber-100">
                    Pending
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-zinc-400 group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
              </div>

              {/* Activity item 2: Resolved */}
              <div
                onClick={() => handleQuickAction('View Maintenance Request')}
                className="group flex items-center justify-between p-3.5 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-zinc-200/60 text-zinc-600 flex items-center justify-center shrink-0 group-hover:bg-zinc-200 transition-colors">
                    <Wrench size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 leading-snug">
                      Maintenance Request - Plumber leak fix
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      Resolved on Oct 08, 2023
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Resolved
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-zinc-400 group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
              </div>

              {/* Activity item 3: Successful */}
              <div
                onClick={() => handleQuickAction('View Invoice Details')}
                className="group flex items-center justify-between p-3.5 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-zinc-200/60 text-zinc-600 flex items-center justify-center shrink-0 group-hover:bg-zinc-200 transition-colors">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 leading-snug">
                      Rent Payment - East Legon Duplex
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      Processed on Oct 01, 2023
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Successful
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-zinc-400 group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
              Need assist? Contact land support
            </span>
            <Link
              href="#"
              className="text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors flex items-center gap-1"
            >
              FieConnect Knowledge Base
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Right column: Current Tenancy & Quick Actions */}
        <div className="space-y-6 text-left">
          {/* Card 1: Current Tenancy details */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-2xs">
            {/* Image banner with overlay */}
            <div className="relative h-40 w-full bg-zinc-100">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                alt="East Legon Duplex"
                fill
                className="object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#03442d] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                Current Tenancy
              </span>
            </div>

            {/* Details */}
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">East Legon Duplex</h4>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold">
                  <MapPin size={10} className="text-zinc-400" />
                  Jungle Road, East Legon, Accra
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-100 py-3">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">
                    Next Rent Due
                  </span>
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <Calendar size={12} />
                    Nov 01, 2023
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">
                    Monthly Rent
                  </span>
                  <div className="text-xs font-black text-slate-700">GH₵ 4,500</div>
                </div>
              </div>

              <Button
                onClick={() => handleQuickAction('Manage Tenancy')}
                variant="outline"
                className="w-full text-xs rounded-xl font-bold border-zinc-200 hover:bg-zinc-50 cursor-pointer h-10"
              >
                Manage Tenancy
              </Button>
            </div>
          </div>

          {/* Card 2: Quick Actions */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-4">
            <h4 className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-widest leading-none mb-1">
              Quick Actions
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickAction('Pay Rent')}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all gap-2 text-center group cursor-pointer"
              >
                <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CreditCard size={16} />
                </div>
                <span className="text-[10px] font-bold text-slate-700">Pay Rent</span>
              </button>

              <button
                onClick={() => handleQuickAction('Report Issue')}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all gap-2 text-center group cursor-pointer"
              >
                <div className="h-9 w-9 rounded-full bg-amber-50 text-[#f0af2f] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Wrench size={16} />
                </div>
                <span className="text-[10px] font-bold text-slate-700">Report Issue</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Footer Banner */}
      <footer className="w-full pt-10 border-t border-zinc-200/75 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            FieConnect
          </div>
          <p className="text-[10px] text-zinc-400 font-semibold">
            © 2026 FieConnect Ghana. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold text-zinc-400 tracking-wide uppercase">
          <Link href="#" className="hover:text-slate-800 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-slate-800 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-slate-800 transition-colors">
            Contact Support
          </Link>
          <Link href="#" className="hover:text-slate-800 transition-colors">
            Careers
          </Link>
        </div>
      </footer>
    </div>
  );
}
