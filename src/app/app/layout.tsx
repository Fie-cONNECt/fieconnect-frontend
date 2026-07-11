'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { requestGQL } from '../../lib/graphql-client';
import { ME_QUERY, LOGOUT_MUTATION } from '../../graphql/operations';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Key,
  AlertTriangle,
  User,
  Settings,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '../../components/ui/skeleton';

export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType?: string;
  phone?: string;
  createdAt: string;
}

interface UserContextProps {
  user: AuthenticatedUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authenticate user on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await requestGQL(ME_QUERY);
        if (data.me) {
          setUser(data.me);
        } else {
          // If no active session, redirect to login
          toast.error('Session expired. Please log in again.');
          router.replace('/login');
        }
      } catch (err) {
        console.error('Auth verification failed:', err);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await requestGQL(LOGOUT_MUTATION);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Logged out successfully.');
      router.replace('/login');
    } catch (e) {
      console.error('Logout failed:', e);
      toast.error('Failed to log out cleanly.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col font-sans animate-pulse">
        {/* Desktop Sidebar Skeleton */}
        <aside className="hidden lg:block fixed top-0 bottom-0 left-0 w-64 border-r border-zinc-200 bg-zinc-50 px-5 py-6 flex flex-col z-20 justify-between">
          <div className="space-y-6">
            <div className="space-y-2 px-2 mb-8">
              <Skeleton className="h-6 w-32 bg-zinc-200" />
              <Skeleton className="h-3 w-24 bg-zinc-200/80" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full bg-zinc-200/70 rounded-xl" />
              ))}
            </div>
          </div>
          <div className="border-t border-zinc-200/75 pt-4 space-y-3">
            <Skeleton className="h-10 w-full bg-zinc-200/70 rounded-xl" />
            <Skeleton className="h-10 w-full bg-zinc-200/70 rounded-xl" />
          </div>
        </aside>

        {/* Content Container Skeleton */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Header Skeleton */}
          <header className="h-16 bg-white border-b border-zinc-100 px-6 flex items-center justify-between">
            <Skeleton className="h-6 w-32 bg-zinc-200" />
            <div className="flex items-center gap-4">
              <Skeleton className="hidden sm:block h-9 w-48 bg-zinc-200/80 rounded-full" />
              <Skeleton className="h-9 w-9 bg-zinc-200/80 rounded-xl" />
              <Skeleton className="h-8 w-24 bg-zinc-200/80 rounded-full" />
            </div>
          </header>

          {/* Main workspace Skeleton */}
          <main className="flex-1 p-6 space-y-6">
            {/* Welcome banner shape */}
            <Skeleton className="h-32 w-full bg-zinc-200 rounded-2xl" />

            {/* Summary cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Skeleton className="h-20 w-full bg-zinc-200 rounded-2xl" />
              <Skeleton className="h-20 w-full bg-zinc-200 rounded-2xl" />
              <Skeleton className="h-20 w-full bg-zinc-200 rounded-2xl" />
            </div>

            {/* Content columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Skeleton className="h-80 w-full bg-zinc-200 rounded-2xl" />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <Skeleton className="h-56 w-full bg-zinc-200 rounded-2xl" />
                <Skeleton className="h-36 w-full bg-zinc-200 rounded-2xl" />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Home', href: '/app', icon: LayoutDashboard },
    { name: 'Properties', href: '#', icon: Building2 },
    { name: 'Applications', href: '#', icon: ClipboardList },
    { name: 'Tenancies', href: '#', icon: Key },
    { name: 'Disputes', href: '#', icon: AlertTriangle },
    { name: 'Profile', href: '#', icon: User },
  ];

  const bottomItems = [{ name: 'Settings', href: '#', icon: Settings }];

  // Helper to check if a navigation item is active
  const isActive = (itemHref: string) => {
    if (itemHref === '/app') {
      return pathname === '/app';
    }
    return pathname.startsWith(itemHref);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-zinc-50 border-r border-zinc-200/80 px-5 py-6">
      {/* Branding Header */}
      <div className="flex flex-col mb-8 px-2">
        <div className="text-xl font-black tracking-tight text-[#0f573f] flex items-center gap-2">
          FieConnect
        </div>
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
          Property Management
        </div>
      </div>

      {/* Main Navigation links */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                active
                  ? 'bg-[#fbbd3f] text-slate-900 shadow-sm border border-[#f0af2f]'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Icon size={16} className={active ? 'text-slate-900' : 'text-zinc-400'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation section */}
      <div className="border-t border-zinc-200/75 pt-4 space-y-1.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
            >
              <Icon size={16} className="text-zinc-400" />
              {item.name}
            </Link>
          );
        })}
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            handleLogout();
          }}
          className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50/50 transition-all cursor-pointer text-left"
        >
          <LogOut size={16} className="text-red-400" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <UserContext.Provider value={{ user, loading, logout: handleLogout }}>
      <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
        {/* Desktop Sidebar (Left side, fixed width) */}
        <aside className="hidden lg:block fixed top-0 bottom-0 left-0 w-64 z-20">
          <SidebarContent />
        </aside>

        {/* Mobile Slide-in Drawer overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            {/* Dark backdrop blur */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer Panel */}
            <div className="fixed top-0 bottom-0 left-0 w-64 bg-zinc-50 z-50 shadow-2xl animate-in slide-in-from-left duration-300">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-500 transition-colors z-50 cursor-pointer"
              >
                <X size={16} />
              </button>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Content Container Area */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Sticky Header */}
          <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur-md border-b border-zinc-100 px-4 sm:px-6 flex items-center justify-between">
            {/* Left Header Section */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-800">
                Dashboard
              </h1>
            </div>

            {/* Right Header Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Bar Input */}
              <div className="relative hidden sm:block w-48 md:w-64">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-9 pl-9 pr-4 rounded-full bg-zinc-100/80 border border-transparent text-xs text-slate-700 placeholder-zinc-400 focus:outline-hidden focus:bg-white focus:border-zinc-200 transition-all font-medium"
                />
              </div>

              {/* Notification icon button */}
              <button className="relative p-2 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 rounded-xl transition-colors cursor-pointer">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-red-500 border-2 border-white text-[8px] font-black text-white flex items-center justify-center shadow-xs">
                  5
                </span>
              </button>

              {/* Profile Avatar Card */}
              <div className="flex items-center gap-2 pl-1 border-l border-zinc-100">
                <div className="relative h-8 w-8 rounded-full overflow-hidden bg-zinc-200 border border-zinc-300">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
                    alt="Kwesi Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-700 leading-tight">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">
                    {user?.userType || 'Tenant'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Contents Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-zinc-50/50">{children}</main>
        </div>
      </div>
    </UserContext.Provider>
  );
}
