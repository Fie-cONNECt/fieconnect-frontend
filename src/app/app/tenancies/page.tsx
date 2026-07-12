'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '../layout';
import { requestGQL } from '../../../lib/graphql-client';
import { MY_TENANCIES_QUERY } from '../../../graphql/operations';
import { Button } from '../../../components/ui/button';
import { isLandlord } from '../../../lib/utils';
import { FileText, Key, Calendar, Building, User as UserIcon, Phone, Mail, ArrowRight } from 'lucide-react';
import { Skeleton } from '../../../components/ui/skeleton';

interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Property {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
  bedrooms?: string;
  bathrooms?: string;
  landlord: UserType;
}

interface Tenancy {
  id: string;
  property: Property;
  tenant: UserType;
  status: string;
  agreementUrl?: string;
  signedAgreementUrl?: string;
  updatedAt: string;
  createdAt: string;
}

export default function TenanciesListPage() {
  const { user } = useUser();
  const landlordMode = isLandlord(user);

  const [tenancies, setTenancies] = useState<Tenancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenancies = async () => {
      try {
        const data = await requestGQL(MY_TENANCIES_QUERY);
        if (data.myTenancies) {
          setTenancies(data.myTenancies as Tenancy[]);
        }
      } catch (err) {
        console.error('Failed to load tenancies:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadTenancies();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6 text-left animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-zinc-200" />
          <Skeleton className="h-4 w-72 bg-zinc-200/85" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full bg-zinc-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">Active Tenancies</h1>
        <p className="text-xs font-semibold text-zinc-400 mt-1">
          {landlordMode
            ? 'Manage and monitor all active leases and tenants for your properties.'
            : 'Access your active tenancy agreement details and contact information.'}
        </p>
      </div>

      {tenancies.length === 0 ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="h-14 w-14 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 rounded-full mx-auto">
            <Key size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">No active tenancies</h3>
            <p className="text-xs text-muted-foreground font-semibold">
              Active lease agreements will appear here once tenancy agreements are signed by both parties.
            </p>
          </div>
          <Link href="/app/applications">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs px-5 py-2 cursor-pointer mt-2">
              Check Applications
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenancies.map((tenancy) => {
            const oppositeParty = landlordMode ? tenancy.tenant : tenancy.property.landlord;
            return (
              <div
                key={tenancy.id}
                className="bg-white border border-zinc-200/85 rounded-2xl overflow-hidden shadow-xs hover:border-zinc-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Property Cover Image */}
                  <div className="relative h-40 w-full bg-zinc-100 border-b border-zinc-155">
                    <Image
                      src={tenancy.property.image}
                      alt={tenancy.property.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      Active
                    </div>
                    <div className="absolute bottom-3 right-3 bg-slate-900/85 text-white font-black text-xs px-3 py-1 rounded-lg">
                      GH₵ {tenancy.property.price.toLocaleString()} / mo
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-4 text-left font-semibold text-xs">
                    <div>
                      <h3 className="text-sm font-black text-slate-800 line-clamp-1">
                        {tenancy.property.title}
                      </h3>
                      <p className="text-[10px] text-zinc-400 font-bold mt-0.5">
                        {tenancy.property.location}
                      </p>
                    </div>

                    {/* Opposite Party Card */}
                    <div className="p-3 bg-zinc-50 rounded-xl flex items-center gap-3">
                      <div className="h-8 w-8 bg-zinc-200/85 rounded-full flex items-center justify-center text-zinc-500 text-xs font-black">
                        {oppositeParty.firstName[0]}
                        {oppositeParty.lastName[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-zinc-800 truncate">
                          {oppositeParty.firstName} {oppositeParty.lastName}
                        </p>
                        <p className="text-[9px] text-zinc-400 uppercase font-black">
                          {landlordMode ? 'Tenant' : 'Landlord'}
                        </p>
                      </div>
                    </div>

                    {/* Lease Dates */}
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <Calendar size={13} className="text-zinc-400" />
                      <span>
                        Lease commenced:{' '}
                        {new Date(parseInt(tenancy.updatedAt) || tenancy.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-zinc-50/50 mt-auto">
                  <Link href={`/app/tenancies/${tenancy.id}`}>
                    <Button className="w-full bg-zinc-50 hover:bg-zinc-100 text-slate-750 font-bold border border-zinc-200/80 rounded-xl text-xs py-2 flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                      View Tenancy Details <ArrowRight size={13} />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
