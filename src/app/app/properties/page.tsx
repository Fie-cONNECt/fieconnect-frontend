'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '../layout';
import { requestGQL } from '../../../lib/graphql-client';
import {
  PROPERTIES_QUERY,
  RECOMMENDED_PROPERTIES_QUERY,
  MY_PROPERTIES_QUERY,
  MY_APPLICATIONS_QUERY,
  MY_TENANCIES_QUERY,
  MY_DISPUTES_QUERY,
} from '../../../graphql/operations';
import { isLandlord } from '../../../lib/utils';
import {
  SEARCH_REGIONS as REGIONS,
  SEARCH_PROPERTY_TYPES as PROPERTY_TYPES,
  RENT_RANGES,
} from '../../../lib/constants';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PropertyCard } from '@/components/property/property-card';
import { StatCard, PageHeader, EmptyState } from '@/components/layout';
import { StatusBadge } from '@/components/ui/status-badge';
import { useForm } from 'react-hook-form';
import { Form } from '../../../components/ui/form';
import { SelectWrapper } from '../../../components/ui/form-wrappers';
import {
  Search,
  MapPin,
  Building2,
  Plus,
  ChevronRight,
  ChevronLeft,
  Layers,
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

interface FilterFormValues {
  region: string;
  propType: string;
  rentRange: string;
}

// ── Tenant Discovery Page ──────────────────────────────────────────
export default function TenantPropertiesPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [recommended, setRecommended] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [appCount, setAppCount] = useState(0);
  const [tenancyCount, setTenancyCount] = useState(0);
  const [disputeCount, setDisputeCount] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const form = useForm<FilterFormValues>({
    defaultValues: {
      region: 'All',
      propType: 'All',
      rentRange: '0',
    },
  });

  const recommendedRef = useRef<HTMLDivElement>(null);

  // If landlord, show their management page instead
  if (!userLoading && user && isLandlord(user)) {
    return <LandlordPropertiesPage />;
  }

  const fetchProperties = async (
    r = form.getValues('region'),
    t = form.getValues('propType'),
    ri = parseInt(form.getValues('rentRange')) || 0,
  ) => {
    setLoading(true);
    try {
      const range = RENT_RANGES[ri];
      const data = (await requestGQL(PROPERTIES_QUERY as any, {
        region: r === 'All' ? undefined : r,
        type: t === 'All' ? undefined : t,
        minPrice: range.min,
        maxPrice: range.max,
      })) as any;
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
      requestGQL(RECOMMENDED_PROPERTIES_QUERY as any, { limit: 12 })
        .then((data: any) => {
          if (data?.recommendedProperties) {
            setRecommended(data.recommendedProperties as PropertyItem[]);
          }
        })
        .catch((err) => console.error('Failed to load recommendations:', err));
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

  const handleSearch = () => {
    setShowAll(true);
    fetchProperties(
      form.getValues('region'),
      form.getValues('propType'),
      parseInt(form.getValues('rentRange')) || 0,
    );
  };

  // Derive sections from the flat list
  const displayedProperties = showAll ? properties : properties.slice(0, 3);
  const recent = properties.slice(0, 5);

  const scrollRec = (dir: 'left' | 'right') => {
    if (recommendedRef.current) {
      recommendedRef.current.scrollBy({
        left: dir === 'left' ? -280 : 280,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="space-y-8 -mx-4 sm:-mx-6 lg:-mx-8 text-left">
      {/* ── Hero Banner ── */}
      <div className="relative mx-4 sm:mx-6 lg:mx-8 overflow-hidden rounded-2xl min-h-[180px] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green-dark/90 via-brand-green/75 to-brand-green-medium/65 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 p-7 pb-8">
          <h1 className="text-h1 text-white tracking-tight leading-tight">
            Welcome to FieConnect.
          </h1>
          <p className="text-white/75 text-sm font-medium mt-2 max-w-sm leading-relaxed">
            Start exploring available rental properties across Ghana with a platform designed for
            trust and transparency.
          </p>
        </div>
      </div>

      {/* ── Search Filters ── */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => handleSearch())}
            className="flex flex-wrap gap-3 items-end"
          >
            <div className="min-w-[160px] text-left">
              <SelectWrapper
                control={form.control as any}
                name="region"
                label="Region"
                options={REGIONS.map((r) => ({ label: r, value: r }))}
                className="h-10 rounded-xl bg-card text-sm font-medium text-foreground border border-border w-full"
              />
            </div>
            <div className="min-w-[160px] text-left">
              <SelectWrapper
                control={form.control as any}
                name="propType"
                label="Property Type"
                options={PROPERTY_TYPES.map((t) => ({ label: t, value: t }))}
                className="h-10 rounded-xl bg-card text-sm font-medium text-foreground border border-border w-full"
              />
            </div>
            <div className="min-w-[180px] text-left">
              <SelectWrapper
                control={form.control as any}
                name="rentRange"
                label="Rent Range (GHS)"
                options={RENT_RANGES.map((r, i) => ({
                  label: r.label,
                  value: i.toString(),
                }))}
                className="h-10 rounded-xl bg-card text-sm font-medium text-foreground border border-border w-full"
              />
            </div>

            <Button
              type="submit"
              className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer"
            >
              <Search size={13} /> Search
            </Button>

            {(form.watch('region') !== 'All' ||
              form.watch('propType') !== 'All' ||
              form.watch('rentRange') !== '0') && (
              <button
                type="button"
                onClick={() => {
                  form.reset({
                    region: 'All',
                    propType: 'All',
                    rentRange: '0',
                  });
                  setShowAll(false);
                  fetchProperties('All', 'All', 0);
                }}
                className="h-10 px-4 border border-border hover:bg-muted text-muted-foreground hover:text-foreground font-semibold rounded-xl text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-ui"
              >
                Clear Filters
              </button>
            )}
          </form>
        </Form>
      </div>

      {/* ── Activity Stats ── */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<Layers size={18} />}
            value={appCount}
            label="Applications Submitted"
            href="/app/applications"
            tone="primary"
          />
          <StatCard
            icon={<Key size={18} />}
            value={tenancyCount > 0 ? tenancyCount : '0'}
            label="Active Tenancy"
            href="/app/tenancies"
            tone="success"
          />
          <StatCard
            icon={<AlertTriangle size={18} />}
            value={disputeCount}
            label="Active Disputes"
            href="/app/disputes"
            tone="warning"
          />
        </div>
      </div>

      {/* ── Featured Properties ── */}
      <section className="px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-h3 text-foreground">
            {showAll ? 'All Matching Properties' : 'Featured Properties'}
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            {showAll ? 'Show Featured Only' : 'View All'}
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-2xl bg-muted" />
            ))}
          </div>
        ) : displayedProperties.length === 0 ? (
          <EmptyState
            icon={<Building2 size={18} />}
            title="No properties found"
            description="No properties match your current filters. Try adjusting region, type, or rent range."
            className="py-10"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={{
                  id: p.id,
                  title: p.title,
                  type: p.type,
                  location: p.location,
                  price: p.price,
                  image: p.image,
                  verified: p.verified,
                  bedrooms: p.bedrooms,
                  bathrooms: p.bathrooms,
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Recommended ── */}
      {!showAll && recommended.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <h2 className="text-h3 text-foreground">Recommended for you</h2>
            <div className="flex gap-1">
              <button
                onClick={() => scrollRec('left')}
                className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-ui cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => scrollRec('right')}
                className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-ui cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
          <div
            ref={recommendedRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 px-4 sm:px-6 lg:px-8 no-scrollbar"
          >
            {recommended.map((p) => (
              <div key={p.id} className="shrink-0 w-64">
                <PropertyCard
                  compact
                  property={{
                    id: p.id,
                    title: p.title,
                    type: p.type,
                    location: p.district || p.region,
                    price: p.price,
                    image: p.image,
                    verified: p.verified,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Recent Listings ── */}
      {!showAll && recent.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800">Recent Listings</h2>
          <div className="card-surface divide-y divide-border overflow-hidden">
            {recent.map((p) => (
              <RecentRow key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      {/* <footer className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-8 mt-4">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p className="text-sm font-black tracking-tight">FieConnect</p>
            <p className="text-[10px] text-white/40 font-semibold mt-1">
              © 2026 FieConnect Ghana. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-[10px] font-bold text-white/50">
            {['Privacy Policy', 'Terms of Service', 'Contact Support', 'Careers'].map((l) => (
              <span key={l} className="hover:text-white cursor-pointer transition-colors">
                {l}
              </span>
            ))}
          </div>
        </div>
      </footer> */}
    </div>
  );
}

function RecentRow({ property: p }: { property: PropertyItem }) {
  return (
    <Link href={`/property/${p.id}`}>
      <div className="flex items-center gap-4 p-4 hover:bg-muted/40 transition-ui cursor-pointer group">
        <div className="relative h-14 w-20 rounded-xl overflow-hidden shrink-0 border border-border">
          <Image src={p.image} alt={p.title} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0 space-y-0.5">
          <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-ui">
            {p.title}
          </p>
          <p className="text-caption flex items-center gap-1">
            <MapPin size={10} aria-hidden /> {p.location} · {timeSince(p.createdAt)}
          </p>
        </div>
        <div className="text-right shrink-0 space-y-1.5">
          <p className="text-sm font-bold text-primary">{formatPrice(p.price)}</p>
          <StatusBadge status="ACTIVE" label="New Listing" />
        </div>
      </div>
    </Link>
  );
}

// ── Landlord Management View ─────────────────────────────────────────
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
    <div className="section-spacing text-left">
      <PageHeader
        title="My Properties"
        description="Manage and track your listed rental properties."
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted p-1 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`h-8 w-8 flex items-center justify-center rounded-lg transition-ui cursor-pointer ${viewMode === 'grid' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
                aria-label="Grid view"
              >
                <Layers size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`h-8 w-8 flex items-center justify-center rounded-lg transition-ui cursor-pointer ${viewMode === 'table' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
                aria-label="Table view"
              >
                <TrendingUp size={14} />
              </button>
            </div>
            <Link href="/app/properties/new">
              <Button className="h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm flex items-center gap-1.5 cursor-pointer shadow-sm">
                <Plus size={14} aria-hidden /> Add Property
              </Button>
            </Link>
          </div>
        }
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-2xl bg-zinc-200" />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <EmptyState
          icon={<Building2 size={20} />}
          title="No properties listed yet"
          description="Add your first property to start receiving applications from verified tenants."
          action={
            <Link href="/app/properties/new">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm px-5 h-10 cursor-pointer">
                <Plus size={14} className="mr-1" aria-hidden /> Add Property
              </Button>
            </Link>
          }
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard
              key={p.id}
              property={{
                id: p.id,
                title: p.title,
                type: p.type,
                location: p.location,
                price: p.price,
                image: p.image,
                verified: p.verified,
                bedrooms: p.bedrooms,
                bathrooms: p.bathrooms,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="card-surface overflow-hidden">
          <table className="w-full text-sm font-medium text-left">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-overline">
                <th className="p-4 pl-5">Property</th>
                <th className="p-4">Location</th>
                <th className="p-4">Type</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-ui">
                  <td className="p-4 pl-5">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-14 rounded-lg overflow-hidden border border-border shrink-0">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>
                      <span className="font-semibold truncate max-w-[180px]">{p.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{p.location}</td>
                  <td className="p-4">
                    <span className="text-caption font-bold uppercase">{p.type}</span>
                  </td>
                  <td className="p-4 font-bold text-primary">{formatPrice(p.price)}</td>
                  <td className="p-4">
                    {p.verified ? (
                      <StatusBadge status="VERIFIED" />
                    ) : (
                      <StatusBadge status="PENDING" label="Pending" />
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
