"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { requestGQL } from "@/lib/graphql-client";
import { ME_QUERY, LOGOUT_MUTATION } from "@/graphql/operations";
import { Button } from "@/components/ui/button";
import { REGIONS, PROPERTY_TYPES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Search,
  Building2,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  KeyRound,
  Star,
  Quote,
  TrendingUp,
  Users,
  Headphones,
  Wallet,
  CheckCircle2,
  MessagesSquare,
} from "lucide-react";
import { propertiesDb } from "@/data/properties";
import {
  PublicNavbar,
  PublicNavbarSkeleton,
  PublicFooter,
  EmptyState,
} from "@/components/layout";
import { PropertyCard } from "@/components/property/property-card";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

const featuredProperties = propertiesDb.filter((p) =>
  [1, 6, 11].includes(p.id),
);

const HOW_IT_WORKS = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Search verified listings across all 16 regions of Ghana. Filter by location, price, and property type to find your perfect match.",
  },
  {
    icon: FileCheck2,
    title: "Apply Digitally",
    description:
      "Submit your rental application online with the required documents. Track its status in real time from your dashboard.",
  },
  {
    icon: KeyRound,
    title: "Move In",
    description:
      "Sign your lease agreement digitally, settle in, and manage rent, disputes, and communication all in one place.",
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every landlord and property is vetted, so you rent with confidence and zero surprises.",
  },
  {
    icon: FileCheck2,
    title: "Digital Agreements",
    description:
      "Sign and store legally binding lease agreements securely, without the paperwork.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "No hidden fees. See the full cost of every property upfront before you apply.",
  },
  {
    icon: MessagesSquare,
    title: "Dispute Mediation",
    description:
      "Raise and resolve issues through a structured, transparent complaint board.",
  },
  {
    icon: TrendingUp,
    title: "Live Dashboards",
    description:
      "Track applications, leases, payments, and notifications in real time.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our team is always available to help both tenants and landlords across Ghana.",
  },
];

const REGION_IMAGES: Record<string, string> = {
  "Greater Accra":
    "https://images.unsplash.com/photo-1547970810-dc1eac37d174?q=80&w=800&auto=format&fit=crop",
  Ashanti:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  Western:
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800&auto=format&fit=crop",
  Eastern:
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop",
};

const TESTIMONIALS = [
  {
    name: "Ama Serwaa",
    role: "Tenant · Accra",
    quote:
      "FieConnect made finding my apartment effortless. I applied, signed the lease, and moved in — all without a single office visit.",
    rating: 5,
  },
  {
    name: "Kwabena Osei",
    role: "Landlord · Kumasi",
    quote:
      "Managing my four rental units used to be a nightmare. Now I review applications and track tenancies from one clean dashboard.",
    rating: 5,
  },
  {
    name: "Efua Mensah",
    role: "Tenant · Takoradi",
    quote:
      "The verified badges gave me real peace of mind. Everything was exactly as advertised — no scams, no stress.",
    rating: 5,
  },
];

const FAQS = [
  {
    question: "Is FieConnect free for tenants?",
    answer:
      "Yes. Browsing listings, submitting applications, and managing your tenancy on FieConnect is completely free for tenants.",
  },
  {
    question: "How are landlords and properties verified?",
    answer:
      "We review ownership documentation and landlord identity before a listing goes live. Verified listings display a badge so you always know what to expect.",
  },
  {
    question: "Can I sign my lease agreement online?",
    answer:
      "Absolutely. Once your application is approved, you can review and sign your lease digitally, and access it any time from your dashboard.",
  },
  {
    question: "What happens if I have a dispute with my landlord?",
    answer:
      "FieConnect provides a structured dispute mediation board where you can raise issues, share evidence, and track resolution transparently.",
  },
  {
    question: "Which regions does FieConnect cover?",
    answer:
      "FieConnect operates across all 16 regions of Ghana, with the largest inventory currently in Greater Accra, Ashanti, Western, and Eastern regions.",
  },
];

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [initLoading, setInitLoading] = useState(true);

  const [region, setRegion] = useState("Greater Accra");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [properties, setProperties] = useState(featuredProperties);
  const [isSearched, setIsSearched] = useState(false);

  const regionHighlights = useMemo(() => {
    return ["Greater Accra", "Ashanti", "Western", "Eastern"].map((name) => ({
      name,
      count: propertiesDb.filter((p) => p.region === name).length,
      image: REGION_IMAGES[name],
    }));
  }, []);

  const handleSearch = () => {
    const results = propertiesDb.filter((prop) => {
      const matchRegion = prop.location
        .toLowerCase()
        .includes(region.toLowerCase());
      const matchType = prop.type === propertyType;
      return matchRegion && matchType;
    });
    setProperties(results);
    setIsSearched(true);
  };

  const handleReset = () => {
    setProperties(featuredProperties);
    setIsSearched(false);
    setRegion("Greater Accra");
    setPropertyType("Apartment");
  };

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
        console.error("Failed to load user info:", err);
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
      console.error("Logout error:", e);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (initLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <PublicNavbarSkeleton />
        <main className="flex-1 space-y-12 pb-12">
          <section className="relative w-full h-[400px] bg-muted animate-pulse flex items-center justify-center">
            <div className="max-w-xl mx-auto px-4 text-center space-y-4 w-full">
              <div className="h-10 w-3/4 bg-muted/80 mx-auto rounded-xl" />
              <div className="h-5 w-1/2 bg-muted/60 mx-auto rounded-lg" />
              <div className="h-14 w-full bg-muted/70 rounded-2xl max-w-lg mx-auto" />
            </div>
          </section>
          <section className="page-container space-y-6">
            <div className="h-6 w-36 bg-muted animate-pulse rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border border-border/50 rounded-2xl p-4 space-y-4"
                >
                  <div className="aspect-video w-full bg-muted animate-pulse rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-5 w-2/3 bg-muted animate-pulse rounded-lg" />
                    <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <PublicNavbar user={user} onLogout={handleLogout} activeLink="browse" />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[600px] h-[min(640px,88vh)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury modern house facade in Accra, Ghana"
            fill
            priority
            className="object-cover object-center scale-105 animate-in fade-in zoom-in-95 duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-8">
          <div className="space-y-5 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-700">
              <ShieldCheck size={14} className="text-primary" aria-hidden />
              Ghana&apos;s trusted rental marketplace
            </span>
            <h1 className="text-display animate-in fade-in slide-in-from-bottom-4 duration-700">
              Find Your Next{" "}
              <span className="text-primary drop-shadow-sm">Home in Ghana</span>
            </h1>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Browse verified rental properties and manage your tenancy
              digitally. We bridge the gap between reliable landlords and
              professional tenants.
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-2xl bg-zinc-950/60 p-4 sm:p-5 shadow-2xl backdrop-blur-xl border border-white/15 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="space-y-1.5 text-left">
              <label className="text-overline text-zinc-300 flex items-center gap-1">
                <MapPin size={10} className="text-primary" aria-hidden /> Region
              </label>
              <Select
                value={region}
                onValueChange={(val) => setRegion(val || "")}
              >
                <SelectTrigger className="!w-full !h-11 rounded-xl bg-white/10 border border-white/10 text-white text-sm px-3 focus:outline-hidden focus:ring-2 focus:ring-primary/50 cursor-pointer flex items-center justify-between">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border border-zinc-800 text-white max-h-60 overflow-y-auto">
                  {REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-overline text-zinc-300 flex items-center gap-1">
                <Building2 size={10} className="text-primary" aria-hidden />{" "}
                Property Type
              </label>
              <Select
                value={propertyType}
                onValueChange={(val) => setPropertyType(val || "")}
              >
                <SelectTrigger className="!w-full !h-11 rounded-xl bg-white/10 border border-white/10 text-white text-sm px-3 focus:outline-hidden focus:ring-2 focus:ring-primary/50 cursor-pointer flex items-center justify-between">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border border-zinc-800 text-white max-h-60 overflow-y-auto">
                  {PROPERTY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSearch}
              className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-md transition-ui cursor-pointer w-full sm:w-auto"
            >
              <Search size={16} aria-hidden />
              Search
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-primary" aria-hidden />{" "}
              Verified landlords
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-primary" aria-hidden />{" "}
              Digital agreements
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-primary" aria-hidden /> No
              hidden fees
            </span>
          </div>
        </div>
      </section>

      {/* ── Trust / Stats band ───────────────────────────────────────── */}
      <section className="w-full bg-secondary text-secondary-foreground border-b border-border py-10 px-4">
        <div className="page-container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500+", label: "Verified Listings" },
            { value: "12k", label: "Active Tenants" },
            { value: "98%", label: "Success Rate" },
            { value: "24/7", label: "Digital Support" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1.5">
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                {stat.value}
              </div>
              <div className="text-overline text-secondary-foreground/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="page-container py-16 sm:py-20 scroll-mt-20"
      >
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <span className="text-overline text-primary">Simple Process</span>
          <h2 className="text-h1 text-foreground">How FieConnect Works</h2>
          <p className="text-body text-muted-foreground">
            From search to move-in, we&apos;ve digitized every step of renting
            in Ghana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {HOW_IT_WORKS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="card-surface p-6 sm:p-8 text-center space-y-4 relative"
              >
                <div className="absolute top-5 right-6 text-5xl font-black text-muted/60 select-none leading-none">
                  {index + 1}
                </div>
                <div className="h-14 w-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto">
                  <Icon size={26} aria-hidden />
                </div>
                <h3 className="text-h3 text-foreground">{step.title}</h3>
                <p className="text-body text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Featured properties ──────────────────────────────────────── */}
      <section
        id="featured"
        className="w-full bg-muted/40 border-y border-border scroll-mt-20"
      >
        <div className="page-container py-16 sm:py-20 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-2">
              <span className="text-overline text-primary">Handpicked</span>
              <h2 className="text-h1 text-foreground">
                {isSearched ? "Search Results" : "Featured Properties"}
              </h2>
              <p className="text-body text-muted-foreground">
                {isSearched
                  ? `${properties.length} ${properties.length === 1 ? "property" : "properties"} found matching your filters`
                  : "Handpicked listings in Ghana's most sought-after locations."}
              </p>
            </div>
            {isSearched ? (
              <button
                type="button"
                onClick={handleReset}
                className="text-sm font-bold text-primary hover:opacity-85 transition-ui self-start"
              >
                Reset Filters
              </button>
            ) : (
              <Link
                href="/app/properties"
                className="group text-sm font-bold text-primary hover:opacity-85 transition-ui flex items-center gap-1 self-start"
              >
                View All Properties
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                  aria-hidden
                />
              </Link>
            )}
          </div>

          {properties.length === 0 ? (
            <EmptyState
              icon={<Building2 size={20} />}
              title="No Properties Found"
              description={`We couldn't find any ${propertyType.toLowerCase()}s matching your search in ${region}. Try adjusting your filters.`}
              action={
                <Button
                  onClick={handleReset}
                  className="text-sm bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-4 h-10 cursor-pointer shadow-sm"
                >
                  Reset Filters
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  href={`/app/properties?region=${encodeURIComponent(prop.region)}&type=${encodeURIComponent(prop.type)}`}
                  ctaLabel="Browse Similar"
                  property={{
                    id: prop.id,
                    title: prop.title,
                    type: prop.type,
                    location: prop.location,
                    price: prop.price,
                    image: prop.image,
                    verified: prop.verified,
                    bedrooms: prop.bedrooms,
                    bathrooms: prop.bathrooms,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Browse by region ─────────────────────────────────────────── */}
      <section className="page-container py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-overline text-primary">Explore</span>
            <h2 className="text-h1 text-foreground">Browse by Region</h2>
            <p className="text-body text-muted-foreground">
              Discover rental homes across Ghana&apos;s most popular regions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {regionHighlights.map((r) => (
            <Link
              key={r.name}
              href="/app/properties"
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden card-surface focus-visible:rounded-2xl"
            >
              <Image
                src={r.image}
                alt={`${r.name} region`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="text-h4 font-bold">{r.name}</h3>
                <p className="text-xs text-white/80 font-medium">
                  {r.count} {r.count === 1 ? "property" : "properties"}
                </p>
              </div>
              <span className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-ui">
                <ArrowRight size={15} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why FieConnect (features) ────────────────────────────────── */}
      <section className="w-full bg-muted/40 border-y border-border">
        <div className="page-container py-16 sm:py-20">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <span className="text-overline text-primary">Why FieConnect</span>
            <h2 className="text-h1 text-foreground">
              Built for Trust &amp; Transparency
            </h2>
            <p className="text-body text-muted-foreground">
              Everything you need to rent or lease with confidence, in one
              modern platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="card-surface-hover p-6 space-y-3 interactive-scale"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                    <Icon size={22} aria-hidden />
                  </div>
                  <h3 className="text-h4 text-foreground">{feature.title}</h3>
                  <p className="text-body text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── For landlords CTA ────────────────────────────────────────── */}
      <section className="page-container py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-brand-green-dark text-white p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-overline text-primary">For Landlords</span>
              <h2 className="text-h1 text-white">
                List Your Property. Reach Verified Tenants.
              </h2>
              <p className="text-body text-white/70 max-w-md">
                Publish your listing in minutes, review applications digitally,
                and manage every lease from a single dashboard. FieConnect
                handles the paperwork so you can focus on your portfolio.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Free, unlimited property listings",
                  "Screen and approve applications online",
                  "Track tenancies, rent, and disputes in real time",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-white/85"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-primary shrink-0"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={user ? "/app/properties/new" : "/signup"}>
                  <Button className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md transition-ui cursor-pointer">
                    {user ? "Add a Listing" : "Become a Landlord"}
                  </Button>
                </Link>
                <Link href="/app/properties">
                  <Button
                    variant="outline"
                    className="h-11 px-6 rounded-xl bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold transition-ui cursor-pointer"
                  >
                    Explore Listings
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Building2, value: "500+", label: "Listings Managed" },
                { icon: Users, value: "12k+", label: "Verified Tenants" },
                {
                  icon: FileCheck2,
                  value: "3 min",
                  label: "Avg. Time to List",
                },
                { icon: TrendingUp, value: "98%", label: "Occupancy Rate" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/10 border border-white/10 p-5 space-y-2 backdrop-blur-sm"
                  >
                    <Icon size={20} className="text-primary" aria-hidden />
                    <div className="text-2xl font-extrabold text-white">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="w-full bg-muted/40 border-y border-border">
        <div className="page-container py-16 sm:py-20">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <span className="text-overline text-primary">Testimonials</span>
            <h2 className="text-h1 text-foreground">
              Loved by Tenants &amp; Landlords
            </h2>
            <p className="text-body text-muted-foreground">
              Real stories from people who found their home or filled their
              properties on FieConnect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="card-surface p-6 space-y-4 flex flex-col"
              >
                <Quote size={28} className="text-primary/40" aria-hidden />
                <blockquote className="text-body text-foreground/90 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div
                  className="flex items-center gap-1"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-primary text-primary"
                      aria-hidden
                    />
                  ))}
                </div>
                <figcaption className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="page-container py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16">
          <div className="space-y-3">
            <span className="text-overline text-primary">FAQ</span>
            <h2 className="text-h1 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-body text-muted-foreground">
              Everything you need to know about renting and listing on
              FieConnect. Can&apos;t find your answer?{" "}
              <Link
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Contact our team.
              </Link>
            </p>
          </div>

          <Accordion className="card-surface px-5 sm:px-6 divide-y divide-border">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border-b-0"
              >
                <AccordionTrigger className="text-base font-semibold text-foreground py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-body text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="page-container pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-h1 text-primary-foreground">
              Ready to Find Your Next Home?
            </h2>
            <p className="text-base text-primary-foreground/80">
              Join thousands of Ghanaians renting smarter. Create your free
              account and start exploring verified listings today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {user ? (
                <Link href="/app/properties">
                  <Button className="h-12 px-8 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold shadow-lg transition-ui cursor-pointer">
                    Browse Properties
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <Button className="h-12 px-8 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold shadow-lg transition-ui cursor-pointer">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="h-12 px-8 rounded-xl bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground font-semibold transition-ui cursor-pointer"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
