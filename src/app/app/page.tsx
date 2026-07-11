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
} from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user } = useUser();
  const userName = user?.firstName || 'Kwesi';

  const handleQuickAction = (actionName: string) => {
    toast.success(`Action "${actionName}" triggered successfully!`);
  };

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
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all">
          <div className="h-11 w-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Key size={20} />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
              Active Tenancy
            </div>
            <div className="text-2xl font-black text-slate-800 leading-none">1</div>
          </div>
        </div>

        {/* Card 2: Pending Applications */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all">
          <div className="h-11 w-11 rounded-full bg-amber-50 text-[#f0af2f] flex items-center justify-center shrink-0">
            <ClipboardList size={20} />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
              Pending Applications
            </div>
            <div className="text-2xl font-black text-slate-800 leading-none">2</div>
          </div>
        </div>

        {/* Card 3: Unread Notifications */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all">
          <div className="h-11 w-11 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <Bell size={20} />
          </div>
          <div className="text-left">
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
        <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
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
                  <div className="text-left">
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
                  <div className="text-left">
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
                  <div className="text-left">
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
        <div className="space-y-6">
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
            <div className="p-5 text-left space-y-4">
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
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 text-left space-y-4">
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
