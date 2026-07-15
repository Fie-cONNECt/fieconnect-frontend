"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { requestGQL } from "../../../../lib/graphql-client";
import {
  ME_QUERY,
  PROPERTY_QUERY,
  CREATE_APPLICATION_MUTATION,
  MY_APPLICATIONS_QUERY,
} from "../../../../graphql/operations";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import { uploadToSupabase } from "../../../../lib/supabase";
import { PublicFooterCompact, BrandLogoLink } from "@/components/layout";
import { useForm } from "react-hook-form";
import { Form } from "../../../../components/ui/form";
import {
  InputWrapper,
  SelectWrapper,
  TextareaWrapper,
} from "../../../../components/ui/form-wrappers";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Bed,
  Bath,
  FileText,
  Upload,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Skeleton } from "../../../../components/ui/skeleton";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface PropertyDetails {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  bedrooms: string;
  bathrooms: string;
  image: string;
}

export default function TenantApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = params?.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [initLoading, setInitLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");

  // File states
  const [nationalIdUrl, setNationalIdUrl] = useState("");
  const [supportingDocsUrl, setSupportingDocsUrl] = useState("");

  // Upload progress indicators
  const [uploadingId, setUploadingId] = useState(false);
  const [uploadingDocs, setUploadingDocs] = useState(false);

  const idInputRef = useRef<HTMLInputElement>(null);
  const docsInputRef = useRef<HTMLInputElement>(null);

  // Initialize react-hook-form
  const form = useForm({
    defaultValues: {
      employerName: "",
      jobTitle: "",
      monthlyIncome: "",
      lengthOfEmployment: "",
      personalStatement: "",
    },
  });

  const watchedValues = form.watch();

  // Load User & Property Info
  useEffect(() => {
    if (!idStr) return;
    const loadData = async () => {
      try {
        const [meData, propData, appsData] = await Promise.all([
          requestGQL(ME_QUERY),
          requestGQL(PROPERTY_QUERY, { id: idStr }),
          requestGQL(MY_APPLICATIONS_QUERY).catch(() => ({
            myApplications: [],
          })),
        ]);

        if (meData.me) {
          setUser(meData.me);
        } else {
          toast.error("Please log in to apply for a tenancy.");
          router.push(`/login?redirectTo=/property/${idStr}/apply`);
          return;
        }

        if (propData.property) {
          setProperty(propData.property as PropertyDetails);
        } else {
          toast.error("Property not found.");
          router.push("/app/properties");
          return;
        }

        if (appsData.myApplications) {
          const application = appsData.myApplications.find(
            (app: any) => app.property.id === idStr,
          );
          if (application) {
            setHasApplied(true);
            setApplicationStatus(application.status);
          }
        }
      } catch (err) {
        console.error("Failed to load application data:", err);
      } finally {
        setInitLoading(false);
      }
    };
    loadData();
  }, [idStr, router]);

  // Document upload handlers
  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(true);
    try {
      const url = await uploadToSupabase(file, "properties");
      setNationalIdUrl(url);
      toast.success("Ghanacard uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload Ghanacard.");
    } finally {
      setUploadingId(false);
    }
  };

  const handleDocsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDocs(true);
    try {
      const url = await uploadToSupabase(file, "properties");
      setSupportingDocsUrl(url);
      toast.success("Supporting documents uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload supporting documents.");
    } finally {
      setUploadingDocs(false);
    }
  };

  // Submit Application
  const onSubmit = async (values: any) => {
    if (!nationalIdUrl) {
      toast.error("Please upload your National ID (Ghanacard).");
      return;
    }

    setSubmitting(true);
    try {
      const response = await requestGQL(CREATE_APPLICATION_MUTATION, {
        input: {
          propertyId: idStr,
          nationalIdUrl,
          supportingDocsUrl: supportingDocsUrl || undefined,
          employerName: values.employerName,
          jobTitle: values.jobTitle,
          monthlyIncome: values.monthlyIncome,
          lengthOfEmployment: values.lengthOfEmployment,
          personalStatement: values.personalStatement,
        },
      });

      if (response.createApplication) {
        toast.success(
          "Your tenancy application has been submitted successfully!",
        );
        router.push(`/property/${idStr}`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit tenancy application.");
    } finally {
      setSubmitting(false);
    }
  };

  // Determine active step for side progress tracker based on form progress
  const getActiveStep = () => {
    if (!nationalIdUrl) return 1;
    const { employerName, jobTitle, monthlyIncome, lengthOfEmployment } =
      watchedValues;
    if (!employerName || !jobTitle || !monthlyIncome || !lengthOfEmployment)
      return 2;
    return 3;
  };

  const activeStep = getActiveStep();

  if (initLoading || !property) {
    return (
      <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-900/20 text-foreground font-sans animate-pulse">
        <header className="h-16 bg-card border-b border-border px-6 flex items-center gap-4">
          <Skeleton className="h-6 w-6 bg-zinc-200" />
          <Skeleton className="h-6 w-32 bg-zinc-200" />
        </header>
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-64 bg-zinc-200 rounded-2xl" />
          </div>
          <div className="lg:col-span-3">
            <Skeleton className="h-96 bg-zinc-200 rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }

  const incomeOptions = [
    { label: "Under GH₵ 2,000", value: "Under 2,000" },
    { label: "GH₵ 2,000 - GH₵ 5,000", value: "2,000 - 5,000" },
    { label: "GH₵ 5,000 - GH₵ 10,000", value: "5,000 - 10,000" },
    { label: "GH₵ 10,000 - GH₵ 20,000", value: "10,000 - 20,000" },
    { label: "GH₵ 20,000+", value: "20,000+" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950/40 text-foreground font-sans">
      {/* 1. Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link
            href={`/property/${property.id}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mr-6"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="flex items-center gap-3 min-w-0">
            <BrandLogoLink href="/" size="sm" />
            <div className="h-4 w-px bg-border shrink-0" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest truncate">
              Tenant Application
            </span>
          </div>
        </div>
      </header>

      {/* Main content grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column - Property summary & Steps */}
          <div className="lg:col-span-1 space-y-6">
            {/* Property Summary Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs relative text-left">
              <div className="relative aspect-video w-full">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider">
                  GH₵ {property.price.toLocaleString()} / mo
                </span>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-extrabold text-foreground line-clamp-1">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                  <MapPin size={12} className="text-primary" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground border-t border-border/50 pt-2.5">
                  <span className="flex items-center gap-1">
                    <Bed size={12} /> {property.bedrooms} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={12} /> {property.bathrooms} Baths
                  </span>
                </div>
              </div>
            </div>

            {/* Application Steps Card */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xs text-left space-y-4">
              <h4 className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-wider border-b border-border/60 pb-2">
                Application Steps
              </h4>
              <div className="space-y-4 relative">
                {[
                  { id: 1, label: "Identity Verification" },
                  { id: 2, label: "Employment Details" },
                  { id: 3, label: "Personal Statement" },
                ].map((step) => {
                  const isCurrent = activeStep === step.id;
                  const isCompleted = activeStep > step.id;
                  return (
                    <div
                      key={step.id}
                      className="flex items-center gap-3 relative z-10"
                    >
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                          isCompleted
                            ? "bg-primary/20 border-primary text-primary"
                            : isCurrent
                              ? "bg-primary border-primary text-primary-foreground shadow-xs"
                              : "bg-muted border-border text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 size={12} /> : step.id}
                      </div>
                      <span
                        className={`text-xs font-bold transition-colors ${
                          isCurrent ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Main Form */}
          <div className="lg:col-span-3">
            {hasApplied ? (
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xs text-center space-y-5">
                <div className="h-16 w-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mx-auto border border-primary/25">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-black text-foreground">
                    Application Already Submitted
                  </h2>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed font-semibold">
                    You have already applied for this property. Your application
                    is currently{" "}
                    <span className="text-primary font-black uppercase tracking-wider">
                      {applicationStatus.toLowerCase()}
                    </span>{" "}
                    and waiting for approval or feedback.
                  </p>
                </div>
                <div className="pt-3">
                  <Link href={`/property/${property.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs px-5 py-2 cursor-pointer">
                      Back to Property
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Step 1: Supporting Documents */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-xs text-left space-y-5">
                    <div className="border-b border-border/60 pb-3">
                      <h2 className="text-sm font-extrabold text-foreground uppercase tracking-widest text-primary">
                        Supporting Documents
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1 font-semibold leading-relaxed">
                        Please provide high-quality scans of your identification
                        and financial records.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Ghanacard Zone */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                          National ID (Ghanacard){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="file"
                          ref={idInputRef}
                          onChange={handleIdUpload}
                          accept="image/*,application/pdf"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => idInputRef.current?.click()}
                          disabled={uploadingId}
                          className={`w-full aspect-[2/1.1] sm:aspect-[2/1] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all gap-2 cursor-pointer ${
                            nationalIdUrl
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary bg-zinc-950/10 hover:bg-primary/5 text-muted-foreground"
                          }`}
                        >
                          {uploadingId ? (
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          ) : nationalIdUrl ? (
                            <CheckCircle2 className="h-6 w-6 text-primary" />
                          ) : (
                            <Upload className="h-6 w-6" />
                          )}
                          <span className="text-xs font-bold text-foreground">
                            {nationalIdUrl
                              ? "Ghanacard Uploaded"
                              : "Click to upload or drag"}
                          </span>
                          <span className="text-[9px] text-muted-foreground font-semibold">
                            PDF, JPG, OR PNG
                          </span>
                        </button>
                      </div>

                      {/* Supporting Docs Zone */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                          Supporting Documents
                        </label>
                        <input
                          type="file"
                          ref={docsInputRef}
                          onChange={handleDocsUpload}
                          accept="image/*,application/pdf"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => docsInputRef.current?.click()}
                          disabled={uploadingDocs}
                          className={`w-full aspect-[2/1.1] sm:aspect-[2/1] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all gap-2 cursor-pointer ${
                            supportingDocsUrl
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary bg-zinc-950/10 hover:bg-primary/5 text-muted-foreground"
                          }`}
                        >
                          {uploadingDocs ? (
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          ) : supportingDocsUrl ? (
                            <CheckCircle2 className="h-6 w-6 text-primary" />
                          ) : (
                            <Upload className="h-6 w-6" />
                          )}
                          <span className="text-xs font-bold text-foreground">
                            {supportingDocsUrl
                              ? "Documents Uploaded"
                              : "Bank statements, Reference letters"}
                          </span>
                          <span className="text-[9px] text-muted-foreground font-semibold">
                            MAX 10MB PER FILE
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Employment Information */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-xs text-left space-y-4">
                    <div className="border-b border-border/60 pb-3">
                      <h2 className="text-sm font-extrabold text-foreground uppercase tracking-widest text-primary">
                        Employment Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputWrapper
                        control={form.control as any}
                        name="employerName"
                        label="Employer Name"
                        type="text"
                        placeholder="e.g. Standard Chartered Bank"
                        required
                      />

                      <InputWrapper
                        control={form.control as any}
                        name="jobTitle"
                        label="Job Title"
                        type="text"
                        placeholder="e.g. Senior Financial Analyst"
                        required
                      />

                      <SelectWrapper
                        control={form.control as any}
                        name="monthlyIncome"
                        label="Monthly Income Range"
                        options={incomeOptions}
                        placeholder="Select Range (GH₵)"
                        className="w-full"
                        required
                      />

                      <InputWrapper
                        control={form.control as any}
                        name="lengthOfEmployment"
                        label="Length of Employment"
                        type="text"
                        placeholder="e.g. 3 years, 2 months"
                        required
                      />
                    </div>
                  </div>

                  {/* Step 3: Personal Statement */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-xs text-left space-y-4">
                    <div className="border-b border-border/60 pb-3">
                      <h2 className="text-sm font-extrabold text-foreground uppercase tracking-widest text-primary">
                        Personal Statement
                      </h2>
                    </div>

                    <TextareaWrapper
                      control={form.control as any}
                      name="personalStatement"
                      label="Tell the landlord about yourself"
                      placeholder="Share your reason for moving, lifestyle habits, or any other information that supports your application..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Footer Consent & Submit Block */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-[10px] text-muted-foreground leading-relaxed text-left font-semibold max-w-md">
                      By clicking submit, you authorize FieConnect to process
                      your data for the purpose of this tenancy application.
                    </p>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto h-11 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold rounded-xl shadow-xs transition-colors cursor-pointer text-xs shrink-0"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin mr-1.5" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>

      <PublicFooterCompact />
    </div>
  );
}
