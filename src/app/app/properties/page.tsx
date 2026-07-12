'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '../layout';
import { requestGQL } from '../../../lib/graphql-client';
import { MY_PROPERTIES_QUERY } from '../../../graphql/operations';
import { isLandlord } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import {
  LayoutGrid,
  List,
  Plus,
  Building2,
  MapPin,
  CheckCircle,
  Clock,
  ArrowRight,
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
}

export default function MyPropertiesPage() {
  const { user, loading: userLoading } = useUser();
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    if (user && isLandlord(user)) {
      fetchProperties();
    } else if (!userLoading) {
      setLoading(false);
    }
  }, [user, userLoading]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await requestGQL(MY_PROPERTIES_QUERY);
      if (data?.myProperties) {
        setProperties(data.myProperties as PropertyItem[]);
      }
    } catch (err) {
      console.error('Error fetching landlord properties:', err);
    } finally {
      setLoading(false);
    }
  };

  // Role Protection
  if (!userLoading && user && !isLandlord(user)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto space-y-4">
        <div className="h-14 w-14 rounded-full bg-amber-50 text-[#f0af2f] flex items-center justify-center shadow-xs">
          <Building2 size={28} />
        </div>
        <h3 className="text-lg font-extrabold text-slate-800">Access Restricted</h3>
        <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
          This portal is reserved for landlords to list and manage their property portfolios. If you
          are a tenant looking for a home, you can view all available listings on our homepage.
        </p>
        <Link href="/" className="pt-2">
          <Button className="h-10 px-5 rounded-xl bg-[#fbbd3f] hover:bg-[#eab335] text-slate-900 font-extrabold shadow-sm transition-all border border-[#f0af2f] cursor-pointer">
            Explore Properties
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500 text-left">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            My Properties
          </h2>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">
            Manage your real estate listings, view verification status, and publish updates.
          </p>
        </div>

        {isLandlord(user) && (
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* View Mode Toggles */}
            <div className="flex items-center bg-input/50 p-0.5 rounded-xl border border-border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-card text-primary shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-card text-primary shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Table View"
              >
                <List size={16} />
              </button>
            </div>

            <Link href="/app/properties/new">
              <Button className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all border border-primary/30 cursor-pointer">
                <Plus size={14} strokeWidth={2.5} />
                Add Property
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* 2. Loading State */}
      {(loading || userLoading) && (
        <div className="space-y-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-border rounded-2xl p-4 bg-card space-y-4">
                  <Skeleton className="h-44 w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-border rounded-2xl overflow-hidden bg-card p-5 space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      )}

      {/* 3. Operational State */}
      {!loading && !userLoading && (
        <>
          {properties.length === 0 ? (
            <div className="min-h-[40vh] border-2 border-dashed border-border rounded-3xl bg-background/50 flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-xs">
                <Building2 size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-foreground">No properties listed yet</h4>
                <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                  Start listing your properties on FieConnect to reach tenants and manage tenancies
                  effortlessly.
                </p>
              </div>
              <Link href="/app/properties/new">
                <Button className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer">
                  <Plus size={14} strokeWidth={2.5} />
                  List Your First Property
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                // GRID/CARDS VIEW
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((prop) => (
                    <div
                      key={prop.id}
                      className="group bg-card border border-border rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col"
                    >
                      {/* Image Banner */}
                      <div className="relative h-44 w-full bg-input/40 overflow-hidden shrink-0">
                        <Image
                          src={
                            prop.image ||
                            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
                          }
                          alt={prop.title}
                          fill
                          className="object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <span
                          className={`absolute top-3 left-3 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1.5 ${
                            prop.verified
                              ? 'bg-primary/10 text-primary border border-primary/20'
                              : 'bg-amber-50 text-[#e69312] border border-amber-100'
                          }`}
                        >
                          {prop.verified ? (
                            <>
                              <CheckCircle size={10} className="text-primary" />
                              Verified
                            </>
                          ) : (
                            <>
                              <Clock size={10} className="text-[#e69312]" />
                              Pending Verification
                            </>
                          )}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-extrabold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {prop.title}
                          </h4>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                            <MapPin size={10} />
                            {prop.location}, {prop.region}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-[10px] font-bold text-muted-foreground">
                          <div>
                            <span className="text-[8px] text-muted-foreground uppercase block tracking-wider">
                              Type
                            </span>
                            <span className="text-foreground block mt-0.5">{prop.type}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-muted-foreground uppercase block tracking-wider">
                              Beds/Baths
                            </span>
                            <span className="text-foreground block mt-0.5">
                              {prop.bedrooms}B / {prop.bathrooms}B
                            </span>
                          </div>
                          <div>
                            <span className="text-[8px] text-muted-foreground uppercase block tracking-wider">
                              Size
                            </span>
                            <span className="text-foreground block mt-0.5">{prop.size} m²</span>
                          </div>
                        </div>

                        <div className="border-t border-border pt-3.5 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[8px] text-muted-foreground uppercase block tracking-wider">
                              Monthly Rent
                            </span>
                            <span className="text-sm font-black text-foreground">
                              GH₵ {prop.price.toLocaleString()}
                            </span>
                          </div>

                          <Link href={`/property/${prop.id}`} className="shrink-0">
                            <Button
                              variant="outline"
                              className="h-8 px-2.5 rounded-lg text-[10px] font-black border-border hover:bg-background flex items-center gap-1 cursor-pointer"
                            >
                              View Details
                              <ArrowRight size={10} />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // TABLE LIST VIEW
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border bg-background/40 text-[10px] font-extrabold uppercase text-muted-foreground tracking-wider">
                          <th className="py-4 px-6 font-bold">Property Details</th>
                          <th className="py-4 px-4 font-bold">Type</th>
                          <th className="py-4 px-4 font-bold">Location</th>
                          <th className="py-4 px-4 font-bold">Monthly Rent</th>
                          <th className="py-4 px-4 font-bold">Status</th>
                          <th className="py-4 px-6 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {properties.map((prop) => (
                          <tr key={prop.id} className="hover:bg-background/20 transition-colors">
                            <td className="py-4 px-6 flex items-center gap-3">
                              <div className="relative h-11 w-11 rounded-lg overflow-hidden shrink-0 border border-border bg-input/40">
                                <Image
                                  src={
                                    prop.image ||
                                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
                                  }
                                  alt={prop.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-left">
                                <h5 className="font-extrabold text-foreground leading-snug">
                                  {prop.title}
                                </h5>
                                <span className="text-[9px] text-muted-foreground font-semibold block mt-0.5">
                                  {prop.bedrooms} Beds • {prop.bathrooms} Baths • {prop.size} m²
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-muted-foreground font-bold">
                              {prop.type}
                            </td>
                            <td className="py-4 px-4 text-muted-foreground font-medium">
                              {prop.location}, {prop.region}
                            </td>
                            <td className="py-4 px-4 font-black text-foreground">
                              GH₵ {prop.price.toLocaleString()}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                                  prop.verified
                                    ? 'bg-primary/10 text-primary border-primary/20'
                                    : 'bg-amber-50 text-[#e69312] border-amber-100'
                                }`}
                              >
                                {prop.verified ? 'Verified' : 'Pending'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <Link href={`/property/${prop.id}`}>
                                <Button
                                  variant="ghost"
                                  className="h-8 px-3 rounded-lg text-[10px] font-extrabold text-primary hover:text-primary/80 hover:bg-primary/10 cursor-pointer"
                                >
                                  View
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
