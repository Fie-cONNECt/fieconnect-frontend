'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogOut, Menu, X, LayoutDashboard, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BrandLogoLink } from '@/components/layout/brand-logo';

export interface PublicNavbarUser {
  firstName: string;
  lastName?: string;
}

interface PublicNavbarProps {
  user?: PublicNavbarUser | null;
  onLogout?: () => void;
  activeLink?: 'browse' | 'how' | 'about' | null;
  className?: string;
}

const NAV_LINKS = [
  { key: 'browse' as const, label: 'Browse', href: '/#featured' },
  { key: 'how' as const, label: 'How it Works', href: '/#how-it-works' },
  { key: 'about' as const, label: 'About', href: '/#about' },
];

export function PublicNavbar({
  user,
  onLogout,
  activeLink = 'browse',
  className,
}: PublicNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-ui',
          scrolled
            ? 'border-b border-border/90 bg-background/90 backdrop-blur-xl shadow-[0_4px_24px_oklch(0.25_0.01_280/0.06)]'
            : 'border-b border-transparent bg-background/70 backdrop-blur-lg',
          className,
        )}
      >
        {/* Brand accent line */}
        <div
          className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          aria-hidden
        />

        <div className="page-container flex h-[4.25rem] items-center justify-between gap-4">
          {/* Logo + desktop nav */}
          <div className="flex items-center gap-8 min-w-0">
            <BrandLogoLink href="/" size="lg" showTagline linkClassName="group" />

            <nav
              className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-muted/50 border border-border/60"
              aria-label="Main"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeLink === link.key;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm font-semibold transition-ui',
                      isActive
                        ? 'bg-card text-foreground shadow-sm ring-1 ring-border/80'
                        : 'text-muted-foreground hover:text-foreground hover:bg-card/60',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link
              href={user ? '/app/properties/new' : '/signup'}
              className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-ui px-3 py-2 rounded-full hover:bg-muted/60"
            >
              <Building2 size={15} aria-hidden />
              List Property
            </Link>

            {user ? (
              <>
                <Link
                  href="/app"
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full border border-border bg-card shadow-sm transition-ui hover:border-primary/30 hover:shadow-md"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/75 flex items-center justify-center text-xs font-bold text-primary-foreground ring-2 ring-background">
                    {user.firstName[0]}
                    {user.lastName?.[0] ?? ''}
                  </div>
                  <div className="hidden xl:flex flex-col text-left leading-tight">
                    <span className="text-xs font-bold text-foreground">{user.firstName}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Dashboard</span>
                  </div>
                </Link>
                {onLogout && (
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    size="sm"
                    className="text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-ui h-10 px-3 rounded-full"
                  >
                    <LogOut size={15} aria-hidden />
                    <span className="hidden xl:inline">Sign Out</span>
                  </Button>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 pl-1">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 px-4 rounded-full text-sm font-semibold text-foreground hover:bg-muted"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="h-10 px-5 rounded-full text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm ring-1 ring-primary/20 transition-ui"
                  >
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              'md:hidden p-2.5 min-h-11 min-w-11 flex items-center justify-center rounded-xl border transition-ui',
              mobileMenuOpen
                ? 'bg-primary/10 border-primary/30 text-foreground'
                : 'border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/60',
            )}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          />

          <div className="absolute top-0 right-0 bottom-0 w-[min(100%,20rem)] bg-card border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <BrandLogoLink href="/" size="sm" onClick={() => setMobileMenuOpen(false)} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-ui"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1" aria-label="Mobile">
              {NAV_LINKS.map((link) => {
                const isActive = activeLink === link.key;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center rounded-xl px-4 py-3.5 text-sm font-semibold transition-ui',
                      isActive
                        ? 'bg-primary/15 text-foreground border border-primary/25'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href={user ? '/app/properties/new' : '/signup'}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-ui"
              >
                <Building2 size={16} aria-hidden />
                List Property
              </Link>
            </nav>

            {/* Drawer footer / auth */}
            <div className="p-4 border-t border-border bg-muted/30 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2 mb-1">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/75 flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {user.firstName[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">Signed in</div>
                    </div>
                  </div>
                  <Link
                    href="/app"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full text-sm font-bold py-3 rounded-xl bg-primary text-primary-foreground shadow-sm transition-ui"
                  >
                    <LayoutDashboard size={16} aria-hidden />
                    Go to Dashboard
                  </Link>
                  {onLogout && (
                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      variant="outline"
                      className="w-full text-sm h-11 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                      <LogOut size={15} className="mr-1.5" aria-hidden />
                      Sign Out
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full text-sm font-semibold py-3 border border-border rounded-xl text-foreground bg-card hover:bg-muted transition-ui"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full text-sm font-bold py-3 bg-primary text-primary-foreground rounded-xl shadow-sm transition-ui"
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function PublicNavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="h-0.5 w-full bg-muted animate-pulse" aria-hidden />
      <div className="page-container flex h-[4.25rem] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-28 bg-muted animate-pulse rounded-lg" />
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="h-10 w-16 bg-muted animate-pulse rounded-full" />
          <div className="h-10 w-24 bg-muted animate-pulse rounded-full" />
        </div>
        <div className="md:hidden h-11 w-11 bg-muted animate-pulse rounded-xl" />
      </div>
    </header>
  );
}
