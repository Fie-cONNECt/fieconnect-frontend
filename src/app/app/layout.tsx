'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { requestGQL } from '../../lib/graphql-client';
import {
  ME_QUERY,
  LOGOUT_MUTATION,
  MY_NOTIFICATIONS_QUERY,
  MARK_NOTIFICATION_READ_MUTATION,
} from '../../graphql/operations';
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
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '../../components/ui/skeleton';
import { isLandlord } from '../../lib/utils';

export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType?: string;
  phone?: string;
  avatarUrl?: string | null;
  bio?: string | null;
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

  // Notification states
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const loadNotifications = async () => {
    try {
      const data = await requestGQL(MY_NOTIFICATIONS_QUERY);
      if (data.myNotifications) {
        setNotifications(data.myNotifications);
      }
    } catch (e) {
      console.error('Failed to load notifications:', e);
    }
  };

  const handleMarkAsRead = async (id: string, link?: string | null) => {
    try {
      await requestGQL(MARK_NOTIFICATION_READ_MUTATION, { id });
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      setNotificationsOpen(false);
      if (link) {
        router.push(link);
      }
    } catch (e) {
      console.error('Failed to mark notification as read:', e);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Authenticate user on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await requestGQL(ME_QUERY);
        if (data.me) {
          setUser(data.me);
          // Load notifications upon auth success
          loadNotifications();
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

    // Poll notifications every 8 seconds
    const interval = setInterval(() => {
      if (localStorage.getItem('token')) {
        loadNotifications();
      }
    }, 8000);
    return () => clearInterval(interval);
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
    { name: 'Properties', href: '/app/properties', icon: Building2 },
    { name: 'Applications', href: '/app/applications', icon: ClipboardList },
    { name: 'Tenancies', href: '/app/tenancies', icon: Key },
    { name: 'Disputes', href: '/app/disputes', icon: AlertTriangle },
    { name: 'Profile', href: '/app/profile', icon: User },
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
        <div className="text-xl font-black tracking-tight text-primary flex items-center gap-2">
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
                  ? 'bg-primary text-primary-foreground shadow-sm border border-primary/30'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Icon size={16} className={active ? 'text-primary-foreground' : 'text-zinc-400'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation section */}
      <div className="border-t border-zinc-200/75 pt-4 space-y-1.5">
        {isLandlord(user) && (
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              router.push('/app/properties/new');
            }}
            className="flex w-full items-center justify-center gap-1.5 px-3.5 py-2.5 mb-2 rounded-xl text-xs font-black bg-primary hover:bg-primary/90 text-primary-foreground transition-all cursor-pointer h-10 shadow-xs border border-primary/30"
          >
            <Plus size={14} strokeWidth={3} />
            Add New Listing
          </button>
        )}
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
          <header
            className={`sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-zinc-100 px-4 sm:px-6 flex items-center justify-between transition-all ${isLandlord(user) ? 'h-20' : 'h-16'}`}
          >
            {/* Left Header Section */}
            {isLandlord(user) ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  <Menu size={20} />
                </button>
                <div className="flex flex-col text-left">
                  <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                    Hello, Mr. {user?.lastName}!
                  </h1>
                  <span className="text-[10px] sm:text-[11px] text-zinc-400 font-bold tracking-wide mt-0.5">
                    Welcome back to your property portfolio overview.
                  </span>
                </div>
              </div>
            ) : (
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
            )}

            {/* Right Header Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Bar Input (Only for Tenants) */}
              {!isLandlord(user) && (
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
              )}

              {/* Notification icon button & dropdown */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-red-500 border-2 border-white text-[8px] font-black text-white flex items-center justify-center shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-zinc-200 rounded-2xl shadow-xl z-50 overflow-hidden text-left animate-in fade-in duration-200">
                    <div className="p-3 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                      <span className="text-xs font-black text-slate-800">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-[9px] bg-primary/20 text-primary font-bold px-2 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-zinc-50 font-semibold text-xs">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-zinc-400 text-xs">
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => handleMarkAsRead(n.id, n.link)}
                            className={`p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer flex flex-col gap-1 text-left ${
                              !n.read
                                ? 'bg-primary/5 border-l-2 border-primary'
                                : 'border-l-2 border-transparent'
                            }`}
                          >
                            <span className="text-slate-800 font-extrabold text-[11px]">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                              {n.message}
                            </span>
                            <span className="text-[9px] text-zinc-400 mt-0.5">
                              {new Date(parseInt(n.createdAt) || n.createdAt).toLocaleTimeString(
                                [],
                                { hour: '2-digit', minute: '2-digit' },
                              )}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Avatar Card */}
              <div className="flex items-center gap-2 pl-1 border-l border-zinc-100">
                <div className="relative h-8 w-8 rounded-full overflow-hidden bg-zinc-200 border border-zinc-300 shrink-0">
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-[10px] font-black text-zinc-600 bg-zinc-100">
                      {`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                    </div>
                  )}
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
