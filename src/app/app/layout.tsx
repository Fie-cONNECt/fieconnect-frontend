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
import { clearAuthSession } from '@/lib/auth-session';
import { BrandLogoLink } from '@/components/layout/brand-logo';
import { OnboardingNudgeBanner } from '@/components/onboarding-nudge-banner';

export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType?: string;
  phone?: string;
  avatarUrl?: string | null;
  bio?: string | null;
  preferences?: {
    regions: string[];
    districts: string[];
    types: string[];
    minPrice?: number | null;
    maxPrice?: number | null;
    bedrooms: string[];
    amenities: string[];
    parking?: string | null;
    onboardingStatus: string;
  } | null;
  createdAt: string;
}

interface UserContextProps {
  user: AuthenticatedUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const loadUser = async () => {
    const data = await requestGQL(ME_QUERY);
    if (data.me) {
      setUser(data.me);
      return data.me;
    }
    return null;
  };

  const refreshUser = async () => {
    try {
      await loadUser();
    } catch (e) {
      console.error('Failed to refresh user:', e);
    }
  };

  // Authenticate user on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const me = await loadUser();
        if (me) {
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
      clearAuthSession();
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
      <div className="min-h-screen bg-background flex flex-col font-sans animate-pulse">
        <aside className="hidden lg:block fixed top-0 bottom-0 left-0 w-64 border-r border-border bg-card px-5 py-6 flex flex-col z-20 justify-between">
          <div className="space-y-6">
            <div className="space-y-2 px-2 mb-8">
              <Skeleton className="h-6 w-32 bg-muted" />
              <Skeleton className="h-3 w-24 bg-muted/80" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full bg-muted/70 rounded-xl" />
              ))}
            </div>
          </div>
          <div className="border-t border-border pt-4 space-y-3">
            <Skeleton className="h-10 w-full bg-muted/70 rounded-xl" />
            <Skeleton className="h-10 w-full bg-muted/70 rounded-xl" />
          </div>
        </aside>

        <div className="lg:pl-64 flex flex-col flex-1">
          <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
            <Skeleton className="h-6 w-32 bg-muted" />
            <div className="flex items-center gap-4">
              <Skeleton className="hidden sm:block h-9 w-48 bg-muted/80 rounded-full" />
              <Skeleton className="h-9 w-9 bg-muted/80 rounded-xl" />
              <Skeleton className="h-8 w-24 bg-muted/80 rounded-full" />
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            <Skeleton className="h-32 w-full bg-muted rounded-2xl" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Skeleton className="h-20 w-full bg-muted rounded-2xl" />
              <Skeleton className="h-20 w-full bg-muted rounded-2xl" />
              <Skeleton className="h-20 w-full bg-muted rounded-2xl" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Skeleton className="h-80 w-full bg-muted rounded-2xl" />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <Skeleton className="h-56 w-full bg-muted rounded-2xl" />
                <Skeleton className="h-36 w-full bg-muted rounded-2xl" />
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

  const bottomItems = [{ name: 'Settings', href: '/app/profile', icon: Settings }];

  // Helper to check if a navigation item is active
  const isActive = (itemHref: string) => {
    if (itemHref === '/app') {
      return pathname === '/app';
    }
    return pathname.startsWith(itemHref);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border px-5 py-6">
      <div className="flex flex-col mb-8 px-2">
        <BrandLogoLink href="/app" size="md" showTagline linkClassName="mb-2" />
        <div className="text-overline">Property Management</div>
      </div>

      <nav className="space-y-1.5 flex-1" aria-label="Dashboard">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 px-3.5 py-2.5 min-h-11 rounded-xl text-sm font-semibold transition-ui ${
                active
                  ? 'bg-primary text-primary-foreground shadow-sm border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon
                size={16}
                className={active ? 'text-primary-foreground' : 'text-muted-foreground'}
                aria-hidden
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border pt-4 space-y-1.5">
        {isLandlord(user) && (
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              router.push('/app/properties/new');
            }}
            className="flex w-full items-center justify-center gap-1.5 px-3.5 py-2.5 mb-2 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-ui cursor-pointer h-11 shadow-sm border border-primary/30"
          >
            <Plus size={14} strokeWidth={3} aria-hidden />
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
              className="flex items-center gap-3 px-3.5 py-2.5 min-h-11 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-ui"
            >
              <Icon size={16} className="text-muted-foreground" aria-hidden />
              {item.name}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            handleLogout();
          }}
          className="flex w-full items-center gap-3 px-3.5 py-2.5 min-h-11 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition-ui cursor-pointer text-left"
        >
          <LogOut size={16} aria-hidden />
          Logout
        </button>
      </div>
    </div>
  );

  const isOnboarding = pathname === '/app/onboarding';

  return (
    <UserContext.Provider value={{ user, loading, logout: handleLogout, refreshUser }}>
      {isOnboarding ? (
        <div className="min-h-dvh bg-background font-sans">{children}</div>
      ) : (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <aside
          className="hidden lg:block fixed top-0 bottom-0 left-0 w-64 z-20"
          aria-label="Sidebar"
        >
          <SidebarContent />
        </aside>

        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden
            />
            <div
              className="fixed top-0 bottom-0 left-0 w-64 bg-sidebar z-50 shadow-2xl animate-in slide-in-from-left duration-300"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2.5 min-h-11 min-w-11 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground transition-ui z-50 cursor-pointer flex items-center justify-center"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
              <SidebarContent />
            </div>
          </div>
        )}

        <div className="lg:pl-64 flex flex-col flex-1">
          <header
            className={`sticky top-0 z-30 bg-card/90 backdrop-blur-md border-b border-border px-4 sm:px-6 flex items-center justify-between transition-ui ${isLandlord(user) ? 'h-20' : 'h-16'}`}
          >
            {isLandlord(user) ? (
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2.5 min-h-11 min-w-11 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-ui cursor-pointer flex items-center justify-center"
                  aria-label="Open menu"
                >
                  <Menu size={20} />
                </button>
                <div className="flex flex-col text-left min-w-0">
                  <h1 className="text-h3 text-foreground truncate">Hello, Mr. {user?.lastName}!</h1>
                  <span className="text-caption mt-0.5 hidden sm:block">
                    Welcome back to your property portfolio overview.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2.5 min-h-11 min-w-11 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-ui cursor-pointer flex items-center justify-center"
                  aria-label="Open menu"
                >
                  <Menu size={20} />
                </button>
                <h1 className="text-h3 text-foreground">Dashboard</h1>
              </div>
            )}

            <div className="flex items-center gap-3 sm:gap-4">
              {!isLandlord(user) && (
                <div className="relative hidden sm:block w-48 md:w-64">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <input
                    type="search"
                    placeholder="Search properties..."
                    aria-label="Search properties"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-9 pr-4 rounded-full bg-muted/80 border border-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:bg-card focus:border-border focus:ring-2 focus:ring-ring/40 transition-ui font-medium"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const query = searchQuery.trim();
                        router.push(
                          query
                            ? `/app/properties?q=${encodeURIComponent(query)}`
                            : '/app/properties',
                        );
                      }
                    }}
                  />
                </div>
              )}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2.5 min-h-11 min-w-11 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-ui cursor-pointer flex items-center justify-center"
                  aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
                  aria-expanded={notificationsOpen}
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-destructive border-2 border-card text-[8px] font-bold text-white flex items-center justify-center shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div
                    className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden text-left animate-in fade-in duration-200"
                    role="menu"
                    aria-label="Notifications"
                  >
                    <div className="p-3 border-b border-border flex justify-between items-center bg-muted/40">
                      <span className="text-sm font-bold text-foreground">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-primary/20 text-primary-foreground font-bold px-2 py-0.5 rounded-full bg-primary/30">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-border font-medium text-sm">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-muted-foreground text-sm">
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            type="button"
                            key={n.id}
                            onClick={() => handleMarkAsRead(n.id, n.link)}
                            className={`w-full p-3.5 hover:bg-muted/60 transition-ui cursor-pointer flex flex-col gap-1 text-left ${
                              !n.read
                                ? 'bg-primary/5 border-l-2 border-primary'
                                : 'border-l-2 border-transparent'
                            }`}
                          >
                            <span className="text-foreground font-bold text-xs">{n.title}</span>
                            <span className="text-caption leading-relaxed">{n.message}</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">
                              {new Date(n.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/app/profile"
                className="flex items-center gap-2 pl-3 border-l border-border hover:opacity-90 transition-ui focus-visible:rounded-lg"
              >
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-muted border border-border shrink-0">
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-[10px] font-bold text-muted-foreground bg-muted">
                      {`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-sm font-semibold text-foreground leading-tight">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="text-overline">{user?.userType || 'Tenant'}</span>
                </div>
              </Link>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
            {pathname !== '/app/onboarding' && <OnboardingNudgeBanner />}
            {children}
          </main>
        </div>
      </div>
      )}
    </UserContext.Provider>
  );
}
