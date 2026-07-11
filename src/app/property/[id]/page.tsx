'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { requestGQL } from '../../../lib/graphql-client';
import { ME_QUERY, LOGOUT_MUTATION } from '../../../graphql/operations';
import { Button } from '../../../components/ui/button';
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
  LogOut,
  Calendar,
  Clock,
  ArrowLeft,
  X,
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

interface PropertyDetails {
  id: number;
  title: string;
  type: string;
  location: string;
  price: string;
  verified: boolean;
  bedrooms: string;
  bathrooms: string;
  size: string;
  parking: string;
  about: string;
  amenities: string[];
  mapDescription: string;
  images: {
    main: string;
    kitchen: string;
    bedroom: string;
    bathroom: string;
  };
  landlord: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
    verified: boolean;
  };
}

// Complete mock database for details
const propertiesDb: Record<number, PropertyDetails> = {
  1: {
    id: 1,
    title: 'Modern 3-Bedroom Apartment',
    type: 'Apartment',
    location: '12 Ringway Cres, Cantonments, Accra',
    price: 'GHS 4,500',
    verified: true,
    bedrooms: '3 Rooms',
    bathrooms: '3.5 Baths',
    size: '2,400 sqft',
    parking: '2 Spaces',
    about:
      'Nestled in the heart of Cantonments, this sophisticated 3-bedroom apartment offers a blend of modern elegance and functional luxury. The open-plan layout is designed for both entertaining and relaxation, featuring premium finishes, floor-to-ceiling windows, and abundant natural light throughout.',
    amenities: [
      '24/7 Security',
      'Water Storage',
      'Swimming Pool',
      'Gym Facility',
      'Back-up Power',
      'Elevator',
    ],
    mapDescription:
      'Located 5 minutes from the American Embassy. Close to premium schools and international restaurants.',
    images: {
      main: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. Kofi Mensah',
      phone: '+233 24 123 4567',
      email: 'kofi.m@email.com',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  2: {
    id: 2,
    title: 'Executive Studio',
    type: 'Studio',
    location: '45 Ahodwo Nhyiaeso, Kumasi',
    price: 'GHS 2,200',
    verified: true,
    bedrooms: '1 Room',
    bathrooms: '1 Bath',
    size: '850 sqft',
    parking: '1 Space',
    about:
      'An executive, modern studio apartment located in the prime residential hub of Kumasi. Offers absolute comfort, top-tier safety, and a beautifully optimized modern kitchen layout, perfect for single professionals or couples looking for a dynamic city hub.',
    amenities: [
      '24/7 Security',
      'Water Storage',
      'Back-up Power',
      'Gym Facility',
      'High-speed Fiber Internet',
      'Private Balcony',
    ],
    mapDescription:
      'Located 3 minutes from the Kumasi Royal Golf Club. Close to premium shopping centers and transit lines.',
    images: {
      main: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Ms. Ama Serwaa',
      phone: '+233 55 987 6543',
      email: 'serwaa.a@email.com',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  3: {
    id: 3,
    title: 'Spacious Townhouse',
    type: 'Townhouse',
    location: '22 Harbour View St, Tema Community 6',
    price: 'GHS 6,000',
    verified: true,
    bedrooms: '4 Rooms',
    bathrooms: '4.5 Baths',
    size: '3,200 sqft',
    parking: '3 Spaces',
    about:
      'This stunning multi-level family townhouse in Tema Community 6 provides high-end spatial efficiency, premium hardwood flooring, custom kitchen cabinets, and a private backyard garden area for family leisure and security.',
    amenities: [
      '24/7 Security',
      'Back-up Power',
      'Swimming Pool',
      'Kids Play Area',
      'Water Storage',
      'Backup Gas Lines',
    ],
    mapDescription:
      'Located 10 minutes from the Tema Harbour. Close to international schools, malls, and Tema Golf Club.',
    images: {
      main: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1620626011761-996317b69798?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. John Lamptey',
      phone: '+233 20 444 5555',
      email: 'lamptey.j@email.com',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
};

export default function PropertyPage() {
  const params = useParams();
  const idStr = params?.id as string;
  const propertyId = parseInt(idStr || '1', 10);
  const property = propertiesDb[propertyId] || propertiesDb[1];

  const [user, setUser] = useState<User | null>(null);
  const [initLoading, setInitLoading] = useState(true);

  // Gallery Interactive State
  const [activeImageKey, setActiveImageKey] = useState<'main' | 'kitchen' | 'bedroom' | 'bathroom'>(
    'main',
  );
  const [activeImageUrl, setActiveImageUrl] = useState(property.images.main);

  // Application Modal state
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [applyMessage, setApplyMessage] = useState(
    `Dear ${property.landlord.name}, I am highly interested in renting your ${property.title} located at ${property.location}. Please get in touch to arrange a viewing.`,
  );
  const [leaseTerm, setLeaseTerm] = useState('12');
  const [moveInDate, setMoveInDate] = useState('2026-08-01');
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);

  // Saved bookmark state
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await requestGQL(ME_QUERY);
        if (data.me) {
          setUser(data.me);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
      } finally {
        setInitLoading(false);
      }
    };
    fetchMe();
  }, []);

  // Update active image when property changes
  useEffect(() => {
    setActiveImageUrl(property.images.main);
    setActiveImageKey('main');
  }, [propertyId, property]);

  // Load Leaflet and render map dynamically on client side
  useEffect(() => {
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

      let lat = 5.5786;
      let lng = -0.1704;
      if (propertyId === 2) {
        lat = 6.6666;
        lng = -1.6244;
      } else if (propertyId === 3) {
        lat = 5.6494;
        lng = -0.0175;
      }

      const container = document.getElementById('property-map');
      if (!container) return;

      if ((container as any)._leaflet_id) {
        container.innerHTML = '';
        (container as any)._leaflet_id = null;
      }

      const map = L.map('property-map', {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([lat, lng], 15);

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

      L.marker([lat, lng], { icon: customIcon })
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
  }, [propertyId, property]);

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

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success('Property saved to your collection!');
    } else {
      toast.info('Property removed from your collection.');
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

  if (initLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground animate-pulse">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary border-muted"></div>
          <p className="text-muted-foreground font-medium text-xs">Loading property details...</p>
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
              <Link href="/" className="hover:text-foreground transition-colors pb-1 pt-0.5">
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

          <div className="flex items-center gap-4">
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
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation / Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/60 pb-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Browse
            </Link>
            <ChevronRight size={12} className="text-muted-foreground/60" />
            <Link href="/" className="hover:text-foreground transition-colors">
              Accra
            </Link>
            <ChevronRight size={12} className="text-muted-foreground/60" />
            <span className="text-foreground line-clamp-1">{property.title}</span>
          </div>

          {/* Share/Save actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveToggle}
              className={`p-2 rounded-xl border border-border flex items-center justify-center transition-all cursor-pointer ${
                isSaved
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              }`}
              title="Save Property"
            >
              <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard!');
              }}
              className="p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              title="Copy Listing URL"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Property Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-emerald-600/10 text-emerald-600 dark:text-emerald-500 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Available Now
              </span>
              {property.verified && (
                <span className="bg-primary/20 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-primary/30">
                  <ShieldCheck size={12} className="text-primary-foreground" /> Verified Listing
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
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-500 mt-1">
              {property.price}
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
              const url = property.images[key];
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
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-border">
                  <Image
                    src={property.landlord.avatar}
                    alt={property.landlord.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{property.landlord.name}</h4>
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase flex items-center gap-1">
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
                <Button
                  onClick={() => setIsApplyOpen(true)}
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer text-xs"
                >
                  Apply for this Property
                </Button>
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
            <div className="bg-emerald-600/5 dark:bg-emerald-600/10 border border-emerald-600/15 p-5 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">
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

      {/* 5. Footer */}
      <footer className="w-full bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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

      {/* Application overlay modal */}
      {isApplyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setIsApplyOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">Apply for Tenancy</h2>
              <p className="text-xs text-muted-foreground font-medium">
                Submit an application to {property.landlord.name}
              </p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={12} className="text-primary" /> Target Move-in
                  </label>
                  <input
                    type="date"
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full h-10 rounded-xl bg-background border border-border text-xs px-3 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 cursor-pointer font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Clock size={12} className="text-primary" /> Lease Duration
                  </label>
                  <select
                    value={leaseTerm}
                    onChange={(e) => setLeaseTerm(e.target.value)}
                    className="w-full h-10 rounded-xl bg-background border border-border text-xs px-3 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 cursor-pointer font-semibold"
                  >
                    <option value="6">6 Months</option>
                    <option value="12">12 Months (1 Year)</option>
                    <option value="24">24 Months (2 Years)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Introduction Message
                </label>
                <textarea
                  rows={4}
                  value={applyMessage}
                  onChange={(e) => setApplyMessage(e.target.value)}
                  className="w-full rounded-xl bg-background border border-border text-xs p-3 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 resize-none font-medium"
                  required
                />
              </div>

              <div className="pt-2 flex gap-3">
                <Button
                  type="button"
                  onClick={() => setIsApplyOpen(false)}
                  variant="outline"
                  className="flex-1 h-10 border-border text-foreground hover:bg-muted font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmittingApplication}
                  className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs cursor-pointer"
                >
                  {isSubmittingApplication ? 'Sending...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
