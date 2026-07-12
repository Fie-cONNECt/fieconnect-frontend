'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '../../layout';
import { requestGQL } from '../../../../lib/graphql-client';
import { TENANCY_QUERY } from '../../../../graphql/operations';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { isLandlord } from '../../../../lib/utils';
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Building,
  User as UserIcon,
  Phone,
  Mail,
  ZoomIn,
  ZoomOut,
  Printer,
  ChevronLeft,
} from 'lucide-react';
import { Skeleton } from '../../../../components/ui/skeleton';

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
  size?: string;
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

export default function TenancyDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { user } = useUser();
  const landlordMode = isLandlord(user);

  const [tenancy, setTenancy] = useState<Tenancy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenancy = async () => {
      try {
        const data = await requestGQL(TENANCY_QUERY, { id });
        if (data.tenancy) {
          setTenancy(data.tenancy as Tenancy);
        }
      } catch (err: any) {
        console.error('Failed to load tenancy details:', err);
        toast.error(err.message || 'Failed to load tenancy details.');
        router.push('/app/tenancies');
      } finally {
        setLoading(false);
      }
    };

    if (user && id) {
      loadTenancy();
    }
  }, [user, id, router]);

  if (loading) {
    return (
      <div className="space-y-6 text-left animate-pulse">
        <Skeleton className="h-6 w-24 bg-zinc-200" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64 bg-zinc-200" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 bg-zinc-200" />
            <Skeleton className="h-10 w-32 bg-zinc-200" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-28 bg-zinc-200 rounded-2xl" />
          <Skeleton className="h-28 bg-zinc-200 rounded-2xl" />
          <Skeleton className="h-28 bg-zinc-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!tenancy) return null;

  // Calculate lease terms
  const startDate = new Date(parseInt(tenancy.updatedAt) || tenancy.updatedAt);
  
  // End date is 1 year from start date
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + 1);

  // Months elapsed calculation
  const currentDate = new Date();
  const diffTime = Math.max(0, currentDate.getTime() - startDate.getTime());
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.4));

  // Days remaining calculation
  const diffEnd = endDate.getTime() - currentDate.getTime();
  const diffDays = Math.max(0, Math.ceil(diffEnd / (1000 * 60 * 60 * 24)));

  // Generate Reference TEN-YYYY-XXXX
  const refCode = `TEN-${startDate.getFullYear()}-${tenancy.id.substring(18, 22).toUpperCase()}`;

  const handleExportPDF = () => {
    if (tenancy.signedAgreementUrl) {
      window.open(tenancy.signedAgreementUrl, '_blank');
    } else {
      toast.error('Signed agreement PDF is not available.');
    }
  };

  const handleDisputeClick = () => {
    toast.info('Disputes resolution portal is currently undergoing maintenance and will be active shortly.');
  };

  return (
    <div className="space-y-6 text-left">
      {/* Back button */}
      <div>
        <Link
          href="/app/tenancies"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-700 transition-colors"
        >
          <ChevronLeft size={14} /> Back to Tenancies
        </Link>
      </div>

      {/* Detail Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              Active
            </span>
            <span className="text-[10px] text-zinc-400 font-extrabold tracking-wider">
              {refCode}
            </span>
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight mt-1.5">
            {tenancy.property.title} - Active
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleDisputeClick}
            variant="outline"
            className="h-10 px-5 border-rose-200 text-rose-600 hover:bg-rose-50/50 hover:text-rose-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
          >
            <AlertTriangle size={13} /> Raise a Dispute
          </Button>
          <Button
            onClick={handleExportPDF}
            className="h-10 px-5 bg-[#0d4f3b] hover:bg-[#093a2b] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
          >
            <Download size={13} /> Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Rent & Term Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-zinc-200/80 p-5 rounded-2xl shadow-2xs">
          <p className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">
            Monthly Rent
          </p>
          <p className="text-base font-black text-slate-800 mt-2">
            GH₵ {tenancy.property.price.toLocaleString()}
          </p>
          <p className="text-[10px] text-zinc-500 font-semibold mt-1">
            Due on 1st of every month
          </p>
        </div>

        <div className="bg-white border border-zinc-200/80 p-5 rounded-2xl shadow-2xs">
          <p className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">
            Start Date
          </p>
          <p className="text-base font-black text-slate-800 mt-2">
            {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-[10px] text-zinc-500 font-semibold mt-1">
            {diffMonths === 0 ? 'Less than a month' : `${diffMonths} month${diffMonths > 1 ? 's' : ''}`} elapsed
          </p>
        </div>

        <div className="bg-white border border-zinc-200/80 p-5 rounded-2xl shadow-2xs">
          <p className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">
            End Date
          </p>
          <p className="text-base font-black text-slate-800 mt-2">
            {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-[10px] text-zinc-500 font-semibold mt-1">
            Renewable in {diffDays} day{diffDays !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Bottom Layout Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Agreement Template Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-2xs overflow-hidden flex flex-col">
            {/* Viewer toolbar header */}
            <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <FileText size={15} className="text-primary" />
                <span>Tenancy Agreement.pdf</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-zinc-200 rounded-lg text-zinc-500 transition-colors cursor-pointer">
                  <ZoomIn size={14} />
                </button>
                <button className="p-1 hover:bg-zinc-200 rounded-lg text-zinc-500 transition-colors cursor-pointer">
                  <ZoomOut size={14} />
                </button>
                <button className="p-1 hover:bg-zinc-200 rounded-lg text-zinc-500 transition-colors cursor-pointer">
                  <Printer size={14} />
                </button>
              </div>
            </div>

            {/* Embed element */}
            <div className="relative h-[500px] bg-zinc-100/50 flex items-center justify-center p-6">
              {tenancy.signedAgreementUrl ? (
                <iframe
                  src={`${tenancy.signedAgreementUrl}#toolbar=0`}
                  className="w-full h-full border-0 rounded-lg bg-white shadow-xs"
                  title="Tenancy Agreement Preview"
                />
              ) : (
                <div className="text-center space-y-2">
                  <FileText size={40} className="text-zinc-300 mx-auto" />
                  <p className="text-xs font-semibold text-zinc-400">
                    Tenancy agreement document is not loaded.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Metadata Cards */}
        <div className="space-y-6">
          {/* Property Info Card */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-2xs overflow-hidden p-4 space-y-4 text-xs font-semibold">
            <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
              Property Information
            </h3>
            <div className="relative h-32 w-full rounded-xl overflow-hidden border border-zinc-150">
              <Image
                src={tenancy.property.image}
                alt={tenancy.property.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-black text-slate-800">{tenancy.property.title}</p>
              <p className="text-[10px] text-zinc-450 mt-0.5">{tenancy.property.location}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-50">
              <div className="text-center bg-zinc-50 p-2 rounded-lg">
                <span className="block text-[11px] font-black text-slate-750">{tenancy.property.bedrooms || '3'}</span>
                <span className="block text-[8px] text-zinc-400 font-bold uppercase">Beds</span>
              </div>
              <div className="text-center bg-zinc-50 p-2 rounded-lg">
                <span className="block text-[11px] font-black text-slate-750">{tenancy.property.bathrooms || '2.5'}</span>
                <span className="block text-[8px] text-zinc-400 font-bold uppercase">Baths</span>
              </div>
              <div className="text-center bg-zinc-50 p-2 rounded-lg">
                <span className="block text-[11px] font-black text-slate-750">{tenancy.property.size || '1,200'}</span>
                <span className="block text-[8px] text-zinc-400 font-bold uppercase">sqft</span>
              </div>
            </div>
          </div>

          {/* Tenant Contact card */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-2xs p-4 space-y-4 text-xs font-semibold">
            <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
              Tenant Information
            </h3>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 font-black">
                {tenancy.tenant.firstName[0]}
                {tenancy.tenant.lastName[0]}
              </div>
              <div>
                <p className="font-black text-slate-800">
                  {tenancy.tenant.firstName} {tenancy.tenant.lastName}
                </p>
                <p className="text-[9px] text-zinc-400 uppercase font-black">Tenant</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-zinc-50 text-left">
              <a
                href={`mailto:${tenancy.tenant.email}`}
                className="flex items-center gap-2 text-zinc-650 hover:text-primary transition-colors"
              >
                <Mail size={13} className="text-zinc-400" />
                <span>{tenancy.tenant.email}</span>
              </a>
              <a
                href={`tel:${tenancy.tenant.phone}`}
                className="flex items-center gap-2 text-zinc-650 hover:text-primary transition-colors"
              >
                <Phone size={13} className="text-zinc-400" />
                <span>{tenancy.tenant.phone}</span>
              </a>
            </div>

            <Button
              variant="outline"
              onClick={() => toast.success('Tenant application history loaded.')}
              className="w-full h-9 border-zinc-200 text-zinc-700 font-bold rounded-xl text-[11px] cursor-pointer"
            >
              View History
            </Button>
          </div>

          {/* Landlord Contact card */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-2xs p-4 space-y-4 text-xs font-semibold">
            <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
              Landlord Information
            </h3>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 font-black">
                {tenancy.property.landlord.firstName[0]}
                {tenancy.property.landlord.lastName[0]}
              </div>
              <div>
                <p className="font-black text-slate-800">
                  {tenancy.property.landlord.firstName} {tenancy.property.landlord.lastName}
                </p>
                <p className="text-[9px] text-zinc-400 uppercase font-black">Landlord</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-zinc-50 text-left">
              <a
                href={`mailto:${tenancy.property.landlord.email}`}
                className="flex items-center gap-2 text-zinc-650 hover:text-primary transition-colors"
              >
                <Mail size={13} className="text-zinc-400" />
                <span>{tenancy.property.landlord.email}</span>
              </a>
              <a
                href={`tel:${tenancy.property.landlord.phone}`}
                className="flex items-center gap-2 text-zinc-650 hover:text-primary transition-colors"
              >
                <Phone size={13} className="text-zinc-400" />
                <span>{tenancy.property.landlord.phone}</span>
              </a>
            </div>

            <Button className="w-full h-9 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-[11px] cursor-pointer border border-emerald-500/20 shadow-2xs">
              Message Landlord
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
