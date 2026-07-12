'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '../layout';
import { requestGQL } from '../../../lib/graphql-client';
import {
  MY_DISPUTES_QUERY,
  MY_TENANCIES_QUERY,
  CREATE_DISPUTE_MUTATION,
} from '../../../graphql/operations';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';
import { isLandlord } from '../../../lib/utils';
import { uploadToSupabase } from '../../../lib/supabase';
import { useForm } from 'react-hook-form';
import { Form } from '../../../components/ui/form';
import { useSearchParams } from 'next/navigation';
import {
  InputWrapper,
  SelectWrapper,
  TextareaWrapper,
} from '../../../components/ui/form-wrappers';
import {
  AlertTriangle,
  Upload,
  Loader2,
  CheckCircle,
  Clock,
  ArrowRight,
  PlusCircle,
  FileText,
  User as UserIcon,
  MessageSquare,
  Send,
} from 'lucide-react';
import { Skeleton } from '../../../components/ui/skeleton';

interface UserType {
  id: string;
  firstName: string;
  lastName: string;
}

interface Property {
  id: string;
  title: string;
  image: string;
  location: string;
}

interface Tenancy {
  id: string;
  property: Property;
  tenant: UserType;
  updatedAt: string;
}

interface Dispute {
  id: string;
  tenancy: {
    id: string;
    property: Property;
  };
  creator: UserType;
  title: string;
  description: string;
  evidenceUrl?: string;
  status: string;
  createdAt: string;
}

interface DisputeFormValues {
  tenancyId: string;
  title: string;
  description: string;
}

function DisputesPageContent() {
  const { user } = useUser();
  const landlordMode = isLandlord(user);
  const searchParams = useSearchParams();
  const tenancyIdParam = searchParams.get('tenancyId');

  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [activeTenancies, setActiveTenancies] = useState<Tenancy[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [uploadingEvidence, setUploadingEvidence] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize react-hook-form with wrappers context
  const form = useForm<DisputeFormValues>({
    defaultValues: {
      tenancyId: '',
      title: '',
      description: '',
    },
  });

  // Pre-fill tenancyId form value if passed via search params
  useEffect(() => {
    if (tenancyIdParam) {
      form.setValue('tenancyId', tenancyIdParam);
      setShowSubmitForm(true);
    }
  }, [tenancyIdParam, form]);

  const loadData = async () => {
    try {
      const disputesData = await requestGQL(MY_DISPUTES_QUERY);
      if (disputesData.myDisputes) {
        setDisputes(disputesData.myDisputes as Dispute[]);
      }

      const tenanciesData = await requestGQL(MY_TENANCIES_QUERY);
      if (tenanciesData.myTenancies) {
        setActiveTenancies(tenanciesData.myTenancies as Tenancy[]);
      }
    } catch (err) {
      console.error('Failed to load disputes data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingEvidence(true);
    try {
      const url = await uploadToSupabase(file, 'agreements');
      setEvidenceUrl(url);
      toast.success('Evidence file uploaded successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload evidence.');
    } finally {
      setUploadingEvidence(false);
    }
  };

  const handleCreateDispute = async (values: DisputeFormValues) => {
    try {
      await requestGQL(CREATE_DISPUTE_MUTATION, {
        tenancyId: values.tenancyId,
        title: values.title,
        description: values.description,
        evidenceUrl: evidenceUrl || null,
      });

      toast.success('Dispute raised successfully! The other party has been notified.');
      form.reset();
      setEvidenceUrl('');
      setShowSubmitForm(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message || 'Failed to file dispute.');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 text-left animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-zinc-200" />
          <Skeleton className="h-4 w-72 bg-zinc-200/85" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full bg-zinc-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Dispute Resolution</h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Resolve issues with property tenancies professionally.
          </p>
        </div>
        {activeTenancies.length > 0 && !showSubmitForm && (
          <Button
            onClick={() => setShowSubmitForm(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs px-5 py-2.5 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <PlusCircle size={14} /> File a Dispute
          </Button>
        )}
      </div>

      {showSubmitForm ? (
        <div className="max-w-2xl bg-white border border-zinc-200/85 p-6 rounded-2xl shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-slate-850 uppercase tracking-wide flex items-center gap-2">
              <AlertTriangle size={16} className="text-primary" /> Submit a Dispute
            </h3>
            <button
              onClick={() => {
                setShowSubmitForm(false);
                setEvidenceUrl('');
                form.reset();
              }}
              className="text-xs font-bold text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateDispute)} className="space-y-5 text-xs font-semibold text-left">
              {/* Tenancy Selector Wrapper */}
              <SelectWrapper
                control={form.control as any}
                name="tenancyId"
                label="Select Active Lease"
                placeholder="-- Choose active property tenancy --"
                options={activeTenancies.map((t) => ({
                  value: t.id,
                  label: `${t.property.title} (${t.property.location})`,
                }))}
                required
              />

              {/* Dispute Title Wrapper */}
              <InputWrapper
                control={form.control as any}
                type="text"
                name="title"
                label="Dispute Title"
                placeholder="e.g. Unresolved plumbing issue at Unit 4"
                required
              />

              {/* Description Wrapper */}
              <TextareaWrapper
                control={form.control as any}
                name="description"
                label="Description of Issue"
                placeholder="Provide a detailed description of the problem and your desired resolution..."
                rows={5}
                required
              />

              {/* Evidence Upload */}
              <div className="space-y-1.5">
                <label className="text-zinc-700 font-bold block">Evidence Upload:</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,application/pdf"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingEvidence}
                  className={`w-full h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all gap-1.5 cursor-pointer bg-white ${
                    evidenceUrl ? 'border-primary text-primary bg-primary/5' : 'border-zinc-200 hover:border-primary text-zinc-400'
                  }`}
                >
                  {uploadingEvidence ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  ) : evidenceUrl ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <Upload className="h-5 w-5 text-primary" />
                  )}
                  <span className="text-[11px] font-bold text-slate-700">
                    {evidenceUrl ? 'Evidence Document Uploaded' : 'Click to upload or drag and drop'}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-bold">
                    PNG, JPG or PDF (max. 10MB)
                  </span>
                </button>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs px-6 py-2.5 flex items-center gap-1.5 cursor-pointer shadow-xs border border-primary/20"
                >
                  <Send size={13} /> Submit Dispute
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : disputes.length === 0 ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="h-14 w-14 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 rounded-full mx-auto">
            <AlertTriangle size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">No disputes raised</h3>
            <p className="text-xs text-muted-foreground font-semibold">
              Dispute resolutions allow tenants and landlords to submit complaints, share evidence, and resolve conflicts.
            </p>
          </div>
          {activeTenancies.length > 0 ? (
            <Button
              onClick={() => setShowSubmitForm(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs px-5 py-2 cursor-pointer mt-2"
            >
              Raise a Dispute
            </Button>
          ) : (
            <p className="text-[10px] text-zinc-400 font-bold">
              You must have an active tenancy lease before filing a dispute.
            </p>
          )}
        </div>
      ) : (
        <div className="bg-white border border-zinc-200/85 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs font-semibold text-left">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-150 text-[10px] text-zinc-400 font-black uppercase tracking-wider">
                  <th className="p-4 pl-5">Dispute Title</th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Filed By</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date Filed</th>
                  <th className="p-4 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-slate-700">
                {disputes.map((d) => (
                  <tr key={d.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4 pl-5 font-bold text-slate-800 max-w-xs truncate">
                      {d.title}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-12 rounded-md overflow-hidden border border-zinc-200 shrink-0">
                          <Image
                            src={d.tenancy.property.image}
                            alt={d.tenancy.property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="truncate max-w-[150px]">{d.tenancy.property.title}</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-zinc-600">
                      {d.creator.firstName} {d.creator.lastName}
                    </td>
                    <td className="p-4">
                      {d.status === 'OPEN' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                          <Clock size={10} /> Open
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-500 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                          <CheckCircle size={10} /> Closed
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-zinc-400 font-medium">
                      {new Date(parseInt(d.createdAt) || d.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 pr-5 text-right">
                      <Link href={`/app/disputes/${d.id}`}>
                        <Button className="bg-zinc-50 hover:bg-zinc-100 text-slate-750 font-bold border border-zinc-200/80 rounded-xl text-[10px] px-3.5 py-1.5 flex items-center justify-center gap-1 cursor-pointer transition-all ml-auto">
                          View Workspace <ArrowRight size={11} />
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
    </div>
  );
}

export default function DisputesPage() {
  return (
    <Suspense fallback={<div className="p-6 text-zinc-400 text-xs font-semibold">Loading disputes workspace...</div>}>
      <DisputesPageContent />
    </Suspense>
  );
}
