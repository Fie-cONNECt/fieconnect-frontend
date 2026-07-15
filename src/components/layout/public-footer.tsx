import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const EXPLORE_LINKS = [
  { label: 'Browse Rentals', href: '/app/properties' },
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Featured Listings', href: '/#featured' },
  { label: 'List a Property', href: '/signup' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Contact Support', href: '#' },
  { label: 'Blog', href: '#' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

function FooterLogo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md ring-1 ring-primary/25">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <polygon points="12 2 2 22 22 22" />
      </svg>
    </div>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-white/90">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-sm font-medium text-white/55 hover:text-white transition-ui"
            >
              {link.label}
              <ArrowUpRight
                size={13}
                className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-70 group-hover:translate-y-0 group-hover:translate-x-0 transition-ui"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface PublicFooterProps {
  className?: string;
  id?: string;
}

export function PublicFooter({ className, id = 'about' }: PublicFooterProps) {
  return (
    <footer
      id={id}
      className={cn(
        'relative w-full bg-brand-green-dark text-white/70 border-t border-brand-green/50 scroll-mt-20 overflow-hidden',
        className,
      )}
    >
      {/* Top accent + ambient glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent" aria-hidden />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/8 blur-3xl rounded-full pointer-events-none"
        aria-hidden
      />

      <div className="relative page-container">
        {/* Newsletter / CTA strip */}
        <div className="py-10 sm:py-12 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/80">
                <ShieldCheck size={13} className="text-primary" aria-hidden />
                Trusted across all 16 regions
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Start renting smarter in Ghana
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">
                Join thousands of tenants and landlords managing properties digitally on FieConnect.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 transition-ui"
              >
                Get Started Free
              </Link>
              <Link
                href="/app/properties"
                className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-ui"
              >
                Browse Listings
              </Link>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="py-12 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <FooterLogo />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-primary transition-ui">
                  FieConnect
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/45 mt-1">
                  Ghana Rentals
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-sm">
              Modernizing the digital tenancy experience in Ghana with trust, transparency, and
              efficiency. Connecting reliable landlords with professional tenants nationwide.
            </p>

            <div className="space-y-2.5 pt-1">
              <a
                href="mailto:support@fieconnect.com"
                className="flex items-center gap-2.5 text-sm text-white/55 hover:text-white transition-ui"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 border border-white/10">
                  <Mail size={14} className="text-primary" aria-hidden />
                </span>
                support@fieconnect.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/55">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 border border-white/10">
                  <Phone size={14} className="text-primary" aria-hidden />
                </span>
                +233 30 000 0000
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/55">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 border border-white/10">
                  <MapPin size={14} className="text-primary" aria-hidden />
                </span>
                Accra, Ghana
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-2">
            <FooterLinkGroup title="Explore" links={EXPLORE_LINKS} />
          </div>
          <div className="lg:col-span-2">
            <FooterLinkGroup title="Company" links={COMPANY_LINKS} />
          </div>
          <div className="lg:col-span-2">
            <FooterLinkGroup title="Legal" links={LEGAL_LINKS} />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} FieConnect Ghana. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 border border-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
              Made in Ghana
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Compact footer for inner public pages (property detail, apply) */
export function PublicFooterCompact({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        'w-full bg-brand-green-dark text-white/60 border-t border-brand-green/50 mt-auto',
        className,
      )}
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden />
      <div className="page-container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/90 text-primary-foreground text-xs font-extrabold shadow-sm">
            F
          </div>
          <span className="text-sm font-bold text-white group-hover:text-primary transition-ui">
            FieConnect
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-white/45">
          <Link href="#" className="hover:text-white/80 transition-ui">
            Privacy
          </Link>
          <Link href="#" className="hover:text-white/80 transition-ui">
            Terms
          </Link>
          <Link href="#" className="hover:text-white/80 transition-ui">
            Support
          </Link>
          <Link href="/app/properties" className="hover:text-white/80 transition-ui">
            Browse
          </Link>
        </div>

        <p className="text-[11px] text-white/35">
          &copy; {new Date().getFullYear()} FieConnect Ghana
        </p>
      </div>
    </footer>
  );
}
