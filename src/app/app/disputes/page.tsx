"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../layout";
import { requestGQL } from "../../../lib/graphql-client";
import {
  MY_DISPUTES_QUERY,
  MY_TENANCIES_QUERY,
  CREATE_DISPUTE_MUTATION,
} from "../../../graphql/operations";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { isLandlord } from "../../../lib/utils";
import { uploadToSupabase } from "../../../lib/supabase";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/ui/form";
import { useSearchParams } from "next/navigation";
import {
  InputWrapper,
  SelectWrapper,
  TextareaWrapper,
} from "../../../components/ui/form-wrappers";
import {
  AlertTriangle,
  Upload,
  Loader2,
  CheckCircle,
  ArrowRight,
  PlusCircle,
  FileText,
  User as UserIcon,
  MessageSquare,
  Send,
} from "lucide-react";
import { Skeleton } from "../../../components/ui/skeleton";
import { PageHeader, EmptyState } from "@/components/layout";
import { StatusBadge } from "@/components/ui/status-badge";

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
  const tenancyIdParam = searchParams.get("tenancyId");

  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [activeTenancies, setActiveTenancies] = useState<Tenancy[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [uploadingEvidence, setUploadingEvidence] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize react-hook-form with wrappers context
  const form = useForm<DisputeFormValues>({
    defaultValues: {
      tenancyId: "",
      title: "",
      description: "",
    },
  });

  // Pre-fill tenancyId form value if passed via search params
  useEffect(() => {
    if (tenancyIdParam) {
      form.setValue("tenancyId", tenancyIdParam);
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
      console.error("Failed to load disputes data:", err);
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
      const url = await uploadToSupabase(file, "agreements");
      setEvidenceUrl(url);
      toast.success("Evidence file uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload evidence.");
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

      toast.success(
        "Dispute raised successfully! The other party has been notified.",
      );
      form.reset();
      setEvidenceUrl("");
      setShowSubmitForm(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to file dispute.");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 text-left animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-muted" />
          <Skeleton className="h-4 w-72 bg-muted/80" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full bg-muted rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Dispute Resolution"
        description="Resolve issues with property tenancies professionally."
        actions={
          activeTenancies.length > 0 && !showSubmitForm ? (
            <Button
              onClick={() => setShowSubmitForm(true)}
              className="rounded-xl font-semibold gap-1.5"
            >
              <PlusCircle size={14} /> File a Dispute
            </Button>
          ) : undefined
        }
      />

      {showSubmitForm ? (
        <div className="max-w-2xl card-surface p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-h4 text-foreground flex items-center gap-2">
              <AlertTriangle size={16} className="text-primary" /> Submit a
              Dispute
            </h3>
            <button
              onClick={() => {
                setShowSubmitForm(false);
                setEvidenceUrl("");
                form.reset();
              }}
              className="text-caption font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-ui"
            >
              Cancel
            </button>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateDispute)}
              className="space-y-5 text-xs font-semibold text-left"
            >
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
                <label className="text-sm font-semibold text-foreground block">
                  Evidence Upload
                </label>
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
                  className={`w-full h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-ui gap-1.5 cursor-pointer bg-card ${
                    evidenceUrl
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border hover:border-primary text-muted-foreground"
                  }`}
                >
                  {uploadingEvidence ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  ) : evidenceUrl ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <Upload className="h-5 w-5 text-primary" />
                  )}
                  <span className="text-sm font-semibold text-foreground">
                    {evidenceUrl
                      ? "Evidence Document Uploaded"
                      : "Click to upload or drag and drop"}
                  </span>
                  <span className="text-caption text-muted-foreground">
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
        <EmptyState
          icon={<AlertTriangle size={24} />}
          title="No disputes raised"
          description="Dispute resolutions allow tenants and landlords to submit complaints, share evidence, and resolve conflicts."
          action={
            activeTenancies.length > 0 ? (
              <Button
                onClick={() => setShowSubmitForm(true)}
                className="rounded-xl font-semibold"
              >
                Raise a Dispute
              </Button>
            ) : (
              <p className="text-caption text-muted-foreground font-semibold">
                You must have an active tenancy lease before filing a dispute.
              </p>
            )
          }
        />
      ) : (
        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-overline text-muted-foreground">
                  <th className="p-4 pl-5">Dispute Title</th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Filed By</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date Filed</th>
                  <th className="p-4 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-body">
                {disputes.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-muted/30 transition-ui"
                  >
                    <td className="p-4 pl-5 font-semibold text-foreground max-w-xs truncate">
                      {d.title}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-12 rounded-md overflow-hidden border border-border shrink-0">
                          <Image
                            src={d.tenancy.property.image}
                            alt={d.tenancy.property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="truncate max-w-[150px]">
                          {d.tenancy.property.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-muted-foreground">
                      {d.creator.firstName} {d.creator.lastName}
                    </td>
                    <td className="p-4">
                      <StatusBadge
                        status={d.status === "OPEN" ? "OPEN" : "CLOSED"}
                        label={d.status === "OPEN" ? "Open" : "Closed"}
                      />
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(
                        d.createdAt || d.createdAt,
                      ).toLocaleDateString()}
                    </td>
                    <td className="p-4 pr-5 text-right">
                      <Link href={`/app/disputes/${d.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl font-semibold gap-1 ml-auto"
                        >
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
    <Suspense
      fallback={
        <div className="p-6 text-muted-foreground text-body">
          Loading disputes workspace...
        </div>
      }
    >
      <DisputesPageContent />
    </Suspense>
  );
}
