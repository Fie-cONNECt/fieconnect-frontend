'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '../layout';
import { requestGQL } from '../../../lib/graphql-client';
import {
  PROPERTIES_QUERY,
  MY_PROPERTIES_QUERY,
  MY_APPLICATIONS_QUERY,
  MY_TENANCIES_QUERY,
  MY_DISPUTES_QUERY,
} from '../../../graphql/operations';
import { isLandlord } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import {
  Search,
  MapPin,
  Building2,
  Plus,
  ChevronRight,
  ChevronLeft,
  Bed,
  Bath,
  ArrowRight,
  CheckCircle,
  Layers,
  Clock,
  AlertTriangle,
  Key,
  TrendingUp,
} from 'lucide-react';

interface PropertyItem {
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
  image: string;
  about: string;
  createdAt: string;
}

const REGIONS = ['All', 'Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Northern', 'Central'];
const PROPERTY_TYPES = ['All', 'Apartment', 'House', 'Studio', 'Villa', 'Townhouse', 'Duplex'];
const RENT_RANGES = [
  { label: 'Any Price', min: undefined, max: undefined },
  { label: '1,000 – 3,000', min: 1000, max: 3000 },
  { label: '3,000 – 5,000', min: 3000, max: 5000 },
  { label: '5,000 – 10,000', min: 5000, max: 10000 },
  { label: '10,000 – 20,000', min: 10000, max: 20000 },
  { label: '20,000+', min: 20000, max: undefined },
];

const TYPE_COLORS: Record<string, string> = {
  Apartment: 'bg-amber-100 text-amber-700',
  House: 'bg-emerald-100 text-emerald-700',
  Studio: 'bg-violet-100 text-violet-700',
  Villa: 'bg-blue-100 text-blue-700',
  Townhouse: 'bg-rose-100 text-rose-700',
  Duplex: 'bg-cyan-100 text-cyan-700',
};

function formatPrice(price: number) {
  return `GHC ${price.toLocaleString()}/mo`;
}

function timeSince(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return 'Just now';
  if (h < 24) return `Added ${h} hour${h > 1 ? 's' : ''} ago`;
  const d = Math.floor(h / 24);
  return `Added ${d} day${d > 1 ? 's' : ''} ago`;
}

// ── Tenant Discovery Page ──────────────────────────────────────────
export default function TenantPropertiesPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [appCount, setAppCount] = useState(0);
  const [tenancyCount, setTenancyCount] = useState(0);
  const [disputeCount, setDisputeCount] = useState(0);

  // Filter state
  const [region, setRegion] = useState('All');
  const [propType, setPropType] = useState('All');
  const [rentRange, setRentRange] = useState(0); // index into RENT_RANGES

  const recommendedRef = useRef<HTMLDivElement>(null);

  // If landlord, show their management page instead
  if (!userLoading && user && isLandlord(user)) {
    return <LandlordPropertiesPage />;
  }

  const fetchProperties = async (r = region, t = propType, ri = rentRange) => {
    setLoading(true);
    try {
      const range = RENT_RANGES[ri];
      const data = await requestGQL(PROPERTIES_QUERY, {
        region: r === 'All' ? undefined : r,
        type: t === 'All' ? undefined : t,
        minPrice: range.min,
        maxPrice: range.max,
      });
      if (data?.properties) setProperties(data.properties as PropertyItem[]);
    } catch (err) {
      console.error('Failed to load properties:', err);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!userLoading) {
      fetchProperties();
      // Load stats
      Promise.all([
        requestGQL(MY_APPLICATIONS_QUERY).catch(() => null),
        requestGQL(MY_TENANCIES_QUERY).catch(() => null),
        requestGQL(MY_DISPUTES_QUERY).catch(() => null),
      ]).then(([apps, tenancies, disputes]) => {
        setAppCount(apps?.myApplications?.length ?? 0);
        setTenancyCount(tenancies?.myTenancies?.length ?? 0);
        setDisputeCount(disputes?.myDisputes?.filter((d: any) => d.status === 'OPEN').length ?? 0);
      });
    }
  }, [userLoading]);

  const handleSearch = () => fetchProperties(region, propType, rentRange);

  // Derive sections from the flat list
  const featured = properties.slice(0, 3);
  const recommended = properties.slice(3, 9);
  const recent = properties.slice(0, 5);

  const scrollRec = (dir: 'left' | 'right') => {
    if (recommendedRef.current) {
      recommendedRef.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 -mx-4 sm:-mx-6 lg:-mx-8 text-left">
      {/* ── Hero Banner ── */}
      <div className="relative mx-4 sm:mx-6 lg:mx-8 overflow-hidden rounded-2xl min-h-[180px] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-emerald-800/70 to-emerald-600/60 z-10" />
        {featured[0] && (
          <Image
            src={featured[0].image}
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-20 p-7 pb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Welcome to FieConnect.
          </h1>
          <p className="text-white/75 text-xs font-semibold mt-2 max-w-sm leading-relaxed">
            Start exploring available rental properties across Ghana with a platform designed for trust and transparency.
          </p>
        </div>
      </div>

      {/* ── Search Filters ── */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1 min-w-[160px]">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="h-10 px-3 rounded-xl border border-zinc-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-primary cursor-pointer"
            >
              {REGIONS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1 min-w-[160px]">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">Property Type</label>
            <select
              value={propType}
              onChange={(e) => setPropType(e.target.value)}
              className="h-10 px-3 rounded-xl border border-zinc-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-primary cursor-pointer"
            >
              {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1 min-w-[180px]">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">Rent Range (GHS)</label>
            <select
              value={rentRange}
              onChange={(e) => setRentRange(Number(e.target.value))}
              className="h-10 px-3 rounded-xl border border-zinc-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-primary cursor-pointer"
            >
              {RENT_RANGES.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
            </select>
          </div>
          <Button
            onClick={handleSearch}
            className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer"
          >
            <Search size={13} /> Search
          </Button>
        </div>
      </div>

      {/* ── Activity Stats ── */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<Layers size={16} className="text-primary" />} value={appCount} label="Applications Submitted" href="/app/applications" />
          <StatCard icon={<Key size={16} className="text-emerald-600" />} value={tenancyCount > 0 ? tenancyCount : 'No'} label="Active Tenancy" href="/app/tenancies" />
          <StatCard icon={<AlertTriangle size={16} className="text-amber-500" />} value={disputeCount} label="Active Disputes" href="/app/disputes" />
        </div>
      </div>

      {/* ── Featured Properties ── */}
      <section className="px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-800">Featured Properties</h2>
          <button onClick={handleSearch} className="text-xs font-bold text-primary hover:underline cursor-pointer">
            View All
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 rounded-2xl bg-zinc-200" />)}
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-12 text-xs text-zinc-400 font-semibold">No properties match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((p) => <FeaturedCard key={p.id} property={p} />)}
          </div>
        )}
      </section>

      {/* ── Recommended ── */}
      {recommended.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-black text-slate-800">
              Recommended in {region === 'All' ? 'Greater Accra' : region}
            </h2>
            <div className="flex gap-1">
              <button onClick={() => scrollRec('left')} className="h-7 w-7 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 cursor-pointer">
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => scrollRec('right')} className="h-7 w-7 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 cursor-pointer">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
          <div
            ref={recommendedRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 px-4 sm:px-6 lg:px-8 no-scrollbar"
          >
            {recommended.map((p) => <RecommendedCard key={p.id} property={p} />)}
          </div>
        </section>
      )}

      {/* ── Recent Listings ── */}
      {recent.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800">Recent Listings</h2>
          <div className="bg-white border border-zinc-200/85 rounded-2xl shadow-xs divide-y divide-zinc-100 overflow-hidden">
            {recent.map((p) => <RecentRow key={p.id} property={p} />)}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-8 mt-4">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p className="text-sm font-black tracking-tight">FieConnect</p>
            <p className="text-[10px] text-white/40 font-semibold mt-1">
              © 2026 FieConnect Ghana. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-[10px] font-bold text-white/50">
            {['Privacy Policy', 'Terms of Service', 'Contact Support', 'Careers'].map((l) => (
              <span key={l} className="hover:text-white cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Featured Card ───────────────────────────────────────────────────
function FeaturedCard({ property: p }: { property: PropertyItem }) {
  return (
    <Link href={`/property/${p.id}`}>
      <div className="group bg-white rounded-2xl border border-zinc-200/85 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer">
        <div className="relative h-44 w-full overflow-hidden">
          <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${TYPE_COLORS[p.type] ?? 'bg-zinc-100 text-zinc-600'}`}>
              {p.type}
            </span>
            <span className="text-xs font-extrabold text-primary">{formatPrice(p.price)}</span>
          </div>
          <h3 className="text-xs font-black text-slate-800 leading-snug">{p.title}</h3>
          <p className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1">
            <MapPin size={10} /> {p.location}
          </p>
          {p.about && (
            <p className="text-[10px] text-zinc-500 font-medium leading-relaxed line-clamp-2">{p.about}</p>
          )}
          <div className="pt-1">
            <div className="w-full h-8 bg-primary/90 hover:bg-primary rounded-xl flex items-center justify-center text-white text-[10px] font-extrabold gap-1 transition-colors">
              View Details <ArrowRight size={11} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Recommended Card ────────────────────────────────────────────────
function RecommendedCard({ property: p }: { property: PropertyItem }) {
  return (
    <Link href={`/property/${p.id}`}>
      <div className="group shrink-0 w-56 bg-white rounded-2xl border border-zinc-200/85 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer">
        <div className="relative h-32 w-full overflow-hidden">
          <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-2 left-2 bg-black/60 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            {p.district || p.region}
          </div>
        </div>
        <div className="p-3 space-y-1">
          <h3 className="text-[11px] font-extrabold text-slate-800 leading-snug line-clamp-1">{p.title}</h3>
          <p className="text-[10px] font-bold text-zinc-500">{formatPrice(p.price)}</p>
          <div className="flex items-center gap-1 text-[10px] text-primary font-extrabold pt-0.5">
            View <ArrowRight size={10} />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Recent Row ──────────────────────────────────────────────────────
function RecentRow({ property: p }: { property: PropertyItem }) {
  return (
    <Link href={`/property/${p.id}`}>
      <div className="flex items-center gap-4 p-4 hover:bg-zinc-50/60 transition-colors cursor-pointer group">
        <div className="relative h-14 w-20 rounded-xl overflow-hidden shrink-0 border border-zinc-100">
          <Image src={p.image} alt={p.title} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0 space-y-0.5">
          <p className="text-xs font-extrabold text-slate-800 truncate">{p.title}</p>
          <p className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1">
            <MapPin size={9} /> {p.location} · {timeSince(p.createdAt)}
          </p>
        </div>
        <div className="text-right shrink-0 space-y-1">
          <p className="text-xs font-extrabold text-slate-800">{formatPrice(p.price)}</p>
          <span className="inline-block bg-emerald-50 text-emerald-700 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
            New Listing
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Stat Card ───────────────────────────────────────────────────────
function StatCard({
  icon,
  value,
  label,
  href,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white border border-zinc-200/85 rounded-xl p-3 sm:p-4 shadow-xs hover:shadow-sm transition-all cursor-pointer space-y-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          {icon}
          <span className="text-lg font-black text-slate-800 leading-none">{value}</span>
        </div>
        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider leading-tight">{label}</p>
      </div>
    </Link>
  );
}

// ── Landlord Management View (unchanged) ────────────────────────────
function LandlordPropertiesPage() {
  const { user } = useUser();
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    requestGQL(MY_PROPERTIES_QUERY)
      .then((data) => {
        if (data?.myProperties) setProperties(data.myProperties as PropertyItem[]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">My Properties</h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Manage and track your listed rental properties.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`h-7 w-7 flex items-center justify-center rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white shadow-xs text-primary' : 'text-zinc-400'}`}
            >
              <Layers size={14} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`h-7 w-7 flex items-center justify-center rounded-lg transition-all cursor-pointer ${viewMode === 'table' ? 'bg-white shadow-xs text-primary' : 'text-zinc-400'}`}
            >
              <TrendingUp size={14} />
            </button>
          </div>
          <Link href="/app/properties/new">
            <Button className="h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs">
              <Plus size={13} /> Add Property
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 rounded-2xl bg-zinc-200" />)}
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-xs space-y-4">
          <div className="h-14 w-14 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 rounded-full mx-auto">
            <Building2 size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">No properties listed yet</h3>
            <p className="text-xs text-muted-foreground font-semibold">
              Add your first property to start receiving applications.
            </p>
          </div>
          <Link href="/app/properties/new">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs px-5 py-2 cursor-pointer">
              <Plus size={13} className="mr-1" /> Add Property
            </Button>
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-zinc-200/85 overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="relative h-44 overflow-hidden">
                <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.verified && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle size={9} /> Verified
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${TYPE_COLORS[p.type] ?? 'bg-zinc-100 text-zinc-600'}`}>{p.type}</span>
                  <span className="text-xs font-extrabold text-primary">{formatPrice(p.price)}</span>
                </div>
                <h3 className="text-xs font-black text-slate-800 leading-snug">{p.title}</h3>
                <p className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1"><MapPin size={10} />{p.location}</p>
                <div className="flex gap-3 text-[10px] text-zinc-500 font-semibold pt-1">
                  <span className="flex items-center gap-1"><Bed size={10} /> {p.bedrooms} bed</span>
                  <span className="flex items-center gap-1"><Bath size={10} /> {p.bathrooms} bath</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-zinc-200/85 rounded-2xl shadow-xs overflow-hidden">
          <table className="w-full text-xs font-semibold text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-150 text-[10px] text-zinc-400 font-black uppercase tracking-wider">
                <th className="p-4 pl-5">Property</th>
                <th className="p-4">Location</th>
                <th className="p-4">Type</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-slate-700">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 pl-5">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-14 rounded-lg overflow-hidden border border-zinc-100 shrink-0">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>
                      <span className="font-extrabold text-slate-800 truncate max-w-[180px]">{p.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-500">{p.location}</td>
                  <td className="p-4">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${TYPE_COLORS[p.type] ?? 'bg-zinc-100 text-zinc-600'}`}>{p.type}</span>
                  </td>
                  <td className="p-4 font-bold text-primary">{formatPrice(p.price)}</td>
                  <td className="p-4">
                    {p.verified ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
                        <CheckCircle size={9} /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-400 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
                        <Clock size={9} /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
