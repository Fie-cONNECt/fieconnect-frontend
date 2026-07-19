'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { requestGQL } from '../../../lib/graphql-client';
import {
  ME_QUERY,
  LOGOUT_MUTATION,
  PROPERTY_QUERY,
  TOGGLE_SAVE_PROPERTY_MUTATION,
  MY_APPLICATIONS_QUERY,
} from '../../../graphql/operations';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  MapPin,
  Building2,
  Bed,
  Bath,
  Maximize2,
  Car,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  Bookmark,
  Share2,
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
  X,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  PublicNavbar,
  PublicNavbarSkeleton,
  PublicFooterCompact,
  EmptyState,
} from '@/components/layout';
import { StatusBadge } from '@/components/ui/status-badge';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  savedProperties: { id: string }[];
  createdAt: string;
}

interface PropertyDetails {
  id: string;
  title: string;
  type: string;
  location: string;
  region: string;
  district: string;
  price: number;
  verified: boolean;
  bedrooms: string;
  bathrooms: string;
  size: string;
  parking: string;
  about: string;
  amenities: string[];
  mapDescription?: string | null;
  lat?: number | null;
  lng?: number | null;
  images: {
    main: string;
    kitchen: string;
    bedroom: string;
    bathroom: string;
  };
  agreementUrl?: string | null;
  landlord: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  createdAt: string;
}

export default function PropertyPage() {
  const params = useParams();
  const idStr = params?.id as string;

  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [initLoading, setInitLoading] = useState(true);
  const [propertyLoading, setPropertyLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Gallery Interactive State
  const [activeImageKey, setActiveImageKey] = useState<'main' | 'kitchen' | 'bedroom' | 'bathroom'>(
    'main',
  );
  const [activeImageUrl, setActiveImageUrl] = useState('');

  // Application Modal state
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [applyMessage, setApplyMessage] = useState('');
  const [leaseTerm, setLeaseTerm] = useState('12');
  const [moveInDate, setMoveInDate] = useState('2026-08-01');
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);

  // Saved bookmark state
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('');

  // Fetch current user & applications
  useEffect(() => {
    const fetchMeAndApps = async () => {
      try {
        const [meData, appsData] = await Promise.all([
          requestGQL(ME_QUERY),
          requestGQL(MY_APPLICATIONS_QUERY).catch(() => ({
            myApplications: [],
          })),
        ]);
        if (meData.me) {
          setUser(meData.me as any);
        }
        if (appsData.myApplications && idStr) {
          const application = appsData.myApplications.find((app: any) => app.property.id === idStr);
          if (application) {
            setHasApplied(true);
            setApplicationStatus(application.status);
          }
        }
      } catch (err) {
        console.error('Failed to load user info:', err);
      } finally {
        setInitLoading(false);
      }
    };
    fetchMeAndApps();
  }, [idStr]);

  // Check if property is saved by user
  useEffect(() => {
    if (user && property && user.savedProperties) {
      const saved = user.savedProperties.some((p) => p.id === property.id);
      setIsSaved(saved);
    }
  }, [user, property]);

  // Fetch property by ID from the real database
  useEffect(() => {
    if (!idStr) return;
    const fetchProperty = async () => {
      setPropertyLoading(true);
      try {
        const data = await requestGQL(PROPERTY_QUERY, { id: idStr });
        if (data.property) {
          setProperty(data.property as PropertyDetails);
          setActiveImageUrl(data.property.images?.main || data.property.image || '');
          setApplyMessage(
            `Dear ${data.property.landlord?.firstName}, I am highly interested in renting your ${data.property.title} located at ${data.property.location}. Please get in touch to arrange a viewing.`,
          );
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Failed to load property:', err);
        setNotFound(true);
      } finally {
        setPropertyLoading(false);
      }
    };
    fetchProperty();
  }, [idStr]);

  // Update active image when user switches gallery tab
  useEffect(() => {
    if (!property) return;
    setActiveImageUrl(property.images[activeImageKey] || property.images.main);
  }, [activeImageKey, property]);

  // Load Leaflet and render map dynamically on client side
  useEffect(() => {
    if (!property || !property.lat || !property.lng) return;

    const cssId = 'leaflet-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const scriptId = 'leaflet-js';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initMap = () => {
      const L = (window as any).L;
      if (!L) return;

      const lat = property.lat;
      const lng = property.lng;

      const container = document.getElementById('property-map');
      if (!container) return;

      if ((container as any)._leaflet_id) {
        container.innerHTML = '';
        (container as any)._leaflet_id = null;
      }

      const map = L.map('property-map', {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([lat!, lng!], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Create a themed gold/amber circular point marker using Leaflet DIV icon
      const customIcon = L.divIcon({
        html: `<div class="relative flex items-center justify-center">
                 <div class="absolute h-10 w-10 bg-amber-500/25 rounded-full animate-ping"></div>
                 <div class="relative h-7 w-7 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-md">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-3.5 w-3.5 text-white">
                     <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                     <circle cx="12" cy="10" r="3"></circle>
                   </svg>
                 </div>
               </div>`,
        className: 'custom-leaflet-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      L.marker([lat!, lng!], { icon: customIcon })
        .addTo(map)
        .bindPopup(
          `<b style="font-family: inherit; font-size: 11px;">${property.title}</b><br/><span style="font-family: inherit; font-size: 10px; color: #666;">${property.location}</span>`,
        )
        .openPopup();

      // Trigger redraw to fix potential gray tiles issue
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      if ((window as any).L) {
        initMap();
      } else {
        script.addEventListener('load', initMap);
      }
    }

    return () => {
      if (script) {
        script.removeEventListener('load', initMap);
      }
    };
  }, [idStr, property]);

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

  const handleSaveToggle = async () => {
    if (!user) {
      toast.error('Please log in to save properties.');
      return;
    }
    if (!property) return;

    try {
      const data = await requestGQL(TOGGLE_SAVE_PROPERTY_MUTATION, {
        propertyId: property.id,
      });
      if (data.toggleSaveProperty) {
        const saved = data.toggleSaveProperty.savedProperties.some(
          (p: any) => p.id === property.id,
        );
        setIsSaved(saved);
        if (saved) {
          toast.success('Property saved to your collection!');
        } else {
          toast.info('Property removed from your collection.');
        }
        setUser((prev) =>
          prev
            ? {
                ...prev,
                savedProperties: data.toggleSaveProperty.savedProperties,
              }
            : null,
        );
      }
    } catch (e: any) {
      console.error('Failed to toggle save property:', e);
      toast.error(e.message || 'An error occurred while saving the property.');
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingApplication(true);
    setTimeout(() => {
      setIsSubmittingApplication(false);
      setIsApplyOpen(false);
      toast.success('Application sent successfully! The landlord will review and contact you.');
    }, 1500);
  };

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <PublicNavbar user={user} onLogout={handleLogout} activeLink="browse" />
        <main className="flex-1 flex items-center justify-center page-container py-16">
          <EmptyState
            icon={<Building2 size={20} />}
            title="Property Not Found"
            description="The property listing you are trying to view does not exist or has been removed."
            action={
              <Link href="/app/properties">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm px-5 h-10 cursor-pointer">
                  Back to Properties
                </Button>
              </Link>
            }
          />
        </main>
      </div>
    );
  }

  if (initLoading || propertyLoading || !property) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans animate-pulse">
        <PublicNavbarSkeleton />

        {/* Main Details page Skeleton */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
          {/* Back link and actions skeleton */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 bg-muted" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 bg-muted rounded-lg" />
              <Skeleton className="h-8 w-8 bg-muted rounded-lg" />
            </div>
          </div>

          {/* Grid Layout: Left Content, Right Protection Box */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Main title + Price */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64 bg-muted rounded-lg" />
                  <Skeleton className="h-4 w-48 bg-muted/70" />
                </div>
                <Skeleton className="h-8 w-32 bg-muted rounded-xl" />
              </div>

              {/* Gallery skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4">
                <Skeleton className="h-96 bg-muted rounded-2xl" />
                <div className="hidden md:flex flex-col gap-3">
                  <Skeleton className="h-28 bg-muted rounded-xl" />
                  <Skeleton className="h-28 bg-muted rounded-xl" />
                  <Skeleton className="h-28 bg-muted rounded-xl" />
                </div>
              </div>

              {/* Specs cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Skeleton className="h-20 bg-muted/50 rounded-xl" />
                <Skeleton className="h-20 bg-muted/50 rounded-xl" />
                <Skeleton className="h-20 bg-muted/50 rounded-xl" />
                <Skeleton className="h-20 bg-muted/50 rounded-xl" />
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <Skeleton className="h-72 w-full bg-muted rounded-2xl" />
              <Skeleton className="h-48 w-full bg-muted rounded-2xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <PublicNavbar user={user} onLogout={handleLogout} activeLink="browse" />

      <main className="flex-1 page-container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/60 pb-4">
          <nav
            className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground transition-ui">
              Browse
            </Link>
            <ChevronRight size={12} className="text-muted-foreground/60" aria-hidden />
            <Link href="/app/properties" className="hover:text-foreground transition-ui">
              {property.region || 'Properties'}
            </Link>
            <ChevronRight size={12} className="text-muted-foreground/60" aria-hidden />
            <span className="text-foreground line-clamp-1">{property.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveToggle}
              className={`p-2.5 min-h-11 min-w-11 rounded-xl border border-border flex items-center justify-center transition-ui cursor-pointer ${
                isSaved
                  ? 'bg-warning/15 text-warning-foreground border-warning/30'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              }`}
              aria-label={isSaved ? 'Unsave property' : 'Save property'}
              aria-pressed={isSaved}
            >
              <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard!');
              }}
              className="p-2.5 min-h-11 min-w-11 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-ui cursor-pointer"
              aria-label="Copy listing URL"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Property Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Available Now
              </span>
              {property.verified && (
                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-primary/30">
                  <ShieldCheck size={12} className="text-primary" /> Verified Listing
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground">
              <MapPin size={16} className="text-primary" />
              {property.location}
            </div>
          </div>

          {/* Pricing Card (Desktop layout) */}
          <div className="bg-card border border-border px-5 py-3 rounded-2xl shadow-xs text-right min-w-[200px]">
            <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">
              Monthly Rent
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-primary mt-1">
              GH₵ {Number(property.price).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Interactive Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Active Photo */}
          <div className="lg:col-span-2 relative h-[320px] sm:h-[450px] rounded-3xl overflow-hidden border border-border/80 bg-muted group shadow-md">
            <Image
              src={activeImageUrl}
              alt={property.title}
              fill
              priority
              className="object-cover transition-all duration-700 scale-100 group-hover:scale-[1.01]"
            />
            {/* Text description overlay */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
              {activeImageKey === 'main' ? 'Exterior View' : activeImageKey}
            </div>
          </div>

          {/* Thumbnail Selector Stack */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
            {(['kitchen', 'bedroom', 'bathroom'] as const).map((key) => {
              const url = property.images[key] || property.images.main;
              const isActive = activeImageKey === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveImageKey(key);
                    setActiveImageUrl(url);
                  }}
                  className={`relative h-[95px] sm:h-[138px] rounded-2xl overflow-hidden border transition-all cursor-pointer group flex flex-col justify-end text-left ${
                    isActive
                      ? 'border-primary ring-2 ring-primary/40 shadow-md'
                      : 'border-border/80 hover:border-primary/50'
                  }`}
                >
                  <Image
                    src={url}
                    alt={`${property.title} ${key}`}
                    fill
                    className="object-cover transition-transform duration-550 group-hover:scale-105"
                  />
                  {/* Subtle caption overlay */}
                  <div className="relative z-10 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-wider">{key}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Key Specs Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card border border-border p-4 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3 px-3 py-2 border-r border-border/40 last:border-0">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary-foreground">
              <Bed size={18} className="text-primary-foreground" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Bedrooms
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-foreground">
                {property.bedrooms}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 border-r border-border/40 last:border-0">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary-foreground">
              <Bath size={18} className="text-primary-foreground" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Bathrooms
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-foreground">
                {property.bathrooms}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 border-r border-border/40 last:border-0">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary-foreground">
              <Maximize2 size={18} className="text-primary-foreground" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Size
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-foreground">
                {property.size}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 last:border-0">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary-foreground">
              <Car size={18} className="text-primary-foreground" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Parking
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-foreground">
                {property.parking}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body: Two columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column (Property Details) */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Property */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground border-b border-border/65 pb-2">
                About this property
              </h2>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-light">
                {property.about}
              </p>

              {/* Key Amenities */}
              <div className="pt-4 space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Key Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs font-medium text-foreground"
                    >
                      <CheckCircle2 size={14} className="text-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mock Vector Location Details Map */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-border/65 pb-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  Location Details
                </h2>
                <Link
                  href={`https://maps.google.com/?q=${encodeURIComponent(property.location)}`}
                  target="_blank"
                  className="text-xs font-bold text-primary hover:opacity-85 transition-opacity"
                >
                  Open in Maps
                </Link>
              </div>

              {/* Real Interactive Leaflet Map */}
              <div
                id="property-map"
                className="h-60 w-full rounded-2xl border border-border z-10"
              />

              {/* Map Description details */}
              <div className="flex items-start gap-2 text-xs font-semibold text-muted-foreground leading-relaxed pt-2">
                <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                <p>{property.mapDescription}</p>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar Action Cards) */}
          <div className="space-y-6">
            {/* Landlord Contact Info */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Landlord Information
              </h3>

              {/* Landlord Profile details */}
              <div className="flex items-center gap-3.5 border-b border-border/60 pb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20 shrink-0">
                  {property.landlord.firstName?.[0] || 'L'}
                  {property.landlord.lastName?.[0] || 'D'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {property.landlord.firstName} {property.landlord.lastName}
                  </h4>
                  <p className="text-[10px] font-bold text-primary uppercase flex items-center gap-1">
                    <ShieldCheck size={11} /> Verified Owner
                  </p>
                </div>
              </div>

              {/* Contact numbers */}
              <div className="space-y-3 pt-1">
                <Link
                  href={`tel:${property.landlord.phone}`}
                  className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-semibold"
                >
                  <div className="p-2 rounded-lg bg-muted text-foreground">
                    <Phone size={14} />
                  </div>
                  <span>{property.landlord.phone}</span>
                </Link>
                <Link
                  href={`mailto:${property.landlord.email}`}
                  className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-semibold"
                >
                  <div className="p-2 rounded-lg bg-muted text-foreground">
                    <Mail size={14} />
                  </div>
                  <span>{property.landlord.email}</span>
                </Link>
              </div>

              {/* Action CTAs */}
              <div className="space-y-2 pt-4">
                {hasApplied ? (
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl text-left space-y-2 mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                      <CheckCircle2 size={16} /> Application Submitted
                    </div>
                    <p className="text-[11px] leading-relaxed text-muted-foreground font-semibold">
                      You have already applied for this property. Your application is currently{' '}
                      <span className="text-primary font-bold">
                        {applicationStatus.toLowerCase()}
                      </span>{' '}
                      and waiting for approval or feedback.
                    </p>
                  </div>
                ) : (
                  <Link href={`/property/${property.id}/apply`} className="w-full">
                    <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer text-xs">
                      Apply for this Property
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={handleSaveToggle}
                  variant="outline"
                  className="w-full h-11 border-border text-foreground hover:bg-muted font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
                >
                  <Bookmark size={14} className={isSaved ? 'text-amber-500 fill-current' : ''} />
                  {isSaved ? 'Property Saved' : 'Save Property'}
                </Button>
              </div>

              <div className="text-center pt-2 text-[10px] text-muted-foreground font-bold tracking-wider">
                Listing Reference: #ACC-CAN-0822
              </div>
            </div>

            {/* Safe / Escrow highlight card */}
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/15 p-5 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <ShieldCheck size={16} /> FieConnect Protection
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground font-semibold">
                This landlord has undergone full identity and title deed verification. Your deposit
                is secured through our escrow system.
              </p>
            </div>
          </div>
        </div>
      </main>

      <PublicFooterCompact />
    </div>
  );
}
