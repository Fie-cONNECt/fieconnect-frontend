'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { requestGQL } from '../lib/graphql-client';
import { ME_QUERY, LOGOUT_MUTATION } from '../graphql/operations';
import { Button } from '../components/ui/button';
import {
  MapPin,
  Search,
  Building2,
  TrendingUp,
  Percent,
  ShieldCheck,
  Clock,
  ArrowRight,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Home as HomeIcon,
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

const featuredProperties = [
  {
    id: 1,
    title: 'Modern 3-Bedroom Apartment',
    type: 'Apartment',
    location: 'East Legon, Greater Accra',
    verified: true,
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Executive Studio',
    type: 'Studio',
    location: 'Kumasi, Ashanti',
    verified: false,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Spacious Townhouse',
    type: 'Townhouse',
    location: 'Tema, Greater Accra',
    verified: false,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [initLoading, setInitLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search filter states
  const [region, setRegion] = useState('Greater Accra');
  const [propertyType, setPropertyType] = useState('Apartment');

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await requestGQL(ME_QUERY);
        if (data.me) {
          setUser(data.me);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to load user info:', err);
        setUser(null);
      } finally {
        setInitLoading(false);
      }
    };
    fetchMe();
  }, []);

  const handleLogout = async () => {
    try {
      await requestGQL(LOGOUT_MUTATION);
    } catch (e) {
      console.error('Logout error:', e);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (initLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground animate-pulse">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary border-muted"></div>
          <p className="text-muted-foreground font-medium text-xs">Initializing fieConnect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* 1. Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5"
                >
                  <polygon points="12 2 2 22 22 22"></polygon>
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">FieConnect</span>
            </Link>

            <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-muted-foreground">
              <Link href="#" className="text-foreground border-b-2 border-primary pb-1 pt-0.5">
                Browse
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors pb-1 pt-0.5">
                How it Works
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors pb-1 pt-0.5">
                About
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-muted/60 px-3 py-1.5 rounded-full border border-border">
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                    {user.firstName[0]}
                  </div>
                  <span className="text-xs font-medium text-foreground">Hi, {user.firstName}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-xs flex items-center gap-1.5 hover:bg-destructive/10 hover:text-destructive transition-colors h-8 px-3 rounded-full"
                >
                  <LogOut size={14} />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full shadow-xs transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background p-4 space-y-4 animate-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-2.5 text-xs font-semibold text-muted-foreground">
              <Link href="#" className="text-foreground font-bold">
                Browse
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                How it Works
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                About
              </Link>
            </nav>
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 py-1">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {user.firstName[0]}
                    </div>
                    <span className="text-xs font-semibold text-foreground">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="w-full text-xs bg-destructive hover:bg-destructive/95 text-white h-9 rounded-xl"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="w-full text-xs font-semibold text-center py-2 border border-border rounded-xl text-foreground hover:bg-muted"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full text-xs font-semibold text-center py-2 bg-primary text-primary-foreground rounded-xl shadow-xs"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative w-full h-[580px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Modern House facade in Accra, Ghana"
            fill
            priority
            className="object-cover object-center scale-105 animate-in fade-in zoom-in-95 duration-1000"
          />
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Find Your Next <span className="text-primary drop-shadow-sm">Home in Ghana</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-200/90 leading-relaxed font-light">
              Browse verified rental properties and manage your tenancy digitally. We bridge the gap
              between reliable landlords and professional tenants.
            </p>
          </div>

          {/* Search Card (Floating Glassmorphism) */}
          <div className="mx-auto max-w-3xl rounded-2xl bg-zinc-950/60 p-4 sm:p-5 shadow-2xl backdrop-blur-xl border border-white/15 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
                <MapPin size={10} className="text-primary" /> Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full h-11 rounded-xl bg-white/10 border border-white/10 text-white text-xs px-3 focus:outline-hidden focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="Greater Accra">Greater Accra 🇬🇭</option>
                <option value="Ashanti">Ashanti</option>
                <option value="Western">Western</option>
                <option value="Eastern">Eastern</option>
              </select>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
                <Building2 size={10} className="text-primary" /> Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full h-11 rounded-xl bg-white/10 border border-white/10 text-white text-xs px-3 focus:outline-hidden focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="Apartment">Apartment</option>
                <option value="Studio">Studio</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <Button className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer w-full sm:w-auto">
              <Search size={16} />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-10 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Featured Properties
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Handpicked listings in Ghana&apos;s most sought-after locations.
            </p>
          </div>
          <Link
            href="#"
            className="group text-xs font-bold text-primary hover:opacity-85 transition-opacity flex items-center gap-1"
          >
            View All Properties
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((prop) => (
            <div
              key={prop.id}
              className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden shadow-xs hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              {/* Image box */}
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {prop.verified && (
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase shadow-xs">
                    Verified
                  </span>
                )}
              </div>

              {/* Card info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase text-primary tracking-wider">
                    {prop.type}
                  </div>
                  <h3 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {prop.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                    <MapPin size={12} className="text-muted-foreground/80" />
                    {prop.location}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full text-xs rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-semibold"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Stats Section Banner */}
      <section className="w-full bg-secondary text-secondary-foreground border-y border-border py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
              500+
            </div>
            <div className="text-[10px] font-bold text-secondary-foreground/60 uppercase tracking-widest">
              Verified Listings
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
              12k
            </div>
            <div className="text-[10px] font-bold text-secondary-foreground/60 uppercase tracking-widest">
              Active Tenants
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
              98%
            </div>
            <div className="text-[10px] font-bold text-secondary-foreground/60 uppercase tracking-widest">
              Success Rate
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
              24/7
            </div>
            <div className="text-[10px] font-bold text-secondary-foreground/60 uppercase tracking-widest">
              Digital Support
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="w-full bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Logo / Description */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold text-sm shadow-xs">
                F
              </div>
              <span className="text-base font-bold tracking-tight text-white">FieConnect</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 font-light">
              Modernizing the digital tenancy experience in Ghana with trust, transparency, and
              efficiency.
            </p>
          </div>

          {/* Quick Links / Copyright */}
          <div className="flex flex-col md:items-end gap-6">
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-zinc-500">
              <Link href="#" className="hover:text-zinc-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-zinc-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-zinc-300 transition-colors">
                Contact Support
              </Link>
              <Link href="#" className="hover:text-zinc-300 transition-colors">
                Careers
              </Link>
            </div>
            <div className="text-[11px] text-zinc-650">
              &copy; {new Date().getFullYear()} FieConnect Ghana. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
