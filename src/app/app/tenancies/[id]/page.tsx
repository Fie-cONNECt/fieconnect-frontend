"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "../../layout";
import { requestGQL } from "../../../../lib/graphql-client";
import { TENANCY_QUERY } from "../../../../graphql/operations";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import { isLandlord } from "../../../../lib/utils";
import {
  FileText,
  Download,
  AlertTriangle,
  Phone,
  Mail,
  ZoomIn,
  ZoomOut,
  Printer,
  ChevronLeft,
} from "lucide-react";
import { Skeleton } from "../../../../components/ui/skeleton";
import { PageHeader, StatCard } from "@/components/layout";
import { StatusBadge } from "@/components/ui/status-badge";

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
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load tenancy details.";
        console.error("Failed to load tenancy details:", err);
        toast.error(message);
        router.push("/app/tenancies");
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
        <Skeleton className="h-6 w-24 bg-muted" />
        <Skeleton className="h-10 w-64 bg-muted" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-28 bg-muted rounded-2xl" />
          <Skeleton className="h-28 bg-muted rounded-2xl" />
          <Skeleton className="h-28 bg-muted rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!tenancy) return null;

  const startDate = new Date(
    isNaN(Number(tenancy.updatedAt))
      ? tenancy.updatedAt
      : parseInt(tenancy.updatedAt),
  );
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + 1);

  const currentDate = new Date();
  const diffMonths = Math.floor(
    Math.max(0, currentDate.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24 * 30.4),
  );
  const diffDays = Math.max(
    0,
    Math.ceil(
      (endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );

  const refCode = `TEN-${startDate.getFullYear()}-${tenancy.id.substring(18, 22).toUpperCase()}`;
  const oppositeParty = landlordMode ? tenancy.tenant : tenancy.property.landlord;
  const oppositeRole = landlordMode ? "Tenant" : "Landlord";

  const handleExportPDF = () => {
    if (tenancy.signedAgreementUrl) {
      window.open(tenancy.signedAgreementUrl, "_blank");
    } else {
      toast.error("Signed agreement PDF is not available.");
    }
  };

  return (
    <div className="space-y-6 text-left">
      <Link
        href="/app/tenancies"
        className="inline-flex items-center gap-1.5 text-caption font-semibold text-muted-foreground hover:text-foreground transition-ui"
      >
        <ChevronLeft size={14} aria-hidden /> Back to Tenancies
      </Link>

      <PageHeader
        title={tenancy.property.title}
        description={`Reference ${refCode}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status="ACTIVE" label="Active" />
            <Button
              onClick={() => router.push(`/app/disputes?tenancyId=${tenancy.id}`)}
              variant="outline"
              className="rounded-xl font-semibold gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <AlertTriangle size={13} aria-hidden /> Raise a Dispute
            </Button>
            <Button
              onClick={handleExportPDF}
              className="rounded-xl font-semibold gap-1.5 bg-brand-green hover:bg-brand-green/90 text-white"
            >
              <Download size={13} aria-hidden /> Export PDF
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Monthly Rent"
          value={`GH₵ ${tenancy.property.price.toLocaleString()}`}
          icon={<FileText size={18} />}
          tone="primary"
        />
        <StatCard
          label="Start Date"
          value={startDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          icon={<FileText size={18} />}
          tone="primary"
        />
        <StatCard
          label="End Date"
          value={endDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          icon={<FileText size={18} />}
          tone="warning"
        />
      </div>

      <p className="text-caption text-muted-foreground -mt-2">
        {diffMonths === 0
          ? "Less than a month elapsed"
          : `${diffMonths} month${diffMonths > 1 ? "s" : ""} elapsed`}
        {" · "}
        Renewable in {diffDays} day{diffDays !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 card-surface overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-muted/40 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText size={15} className="text-primary" aria-hidden />
              <span>Tenancy Agreement.pdf</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-ui"
                aria-label="Zoom in"
              >
                <ZoomIn size={14} />
              </button>
              <button
                type="button"
                className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-ui"
                aria-label="Zoom out"
              >
                <ZoomOut size={14} />
              </button>
              <button
                type="button"
                onClick={handleExportPDF}
                className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-ui"
                aria-label="Print agreement"
              >
                <Printer size={14} />
              </button>
            </div>
          </div>

          <div className="relative h-[500px] bg-muted/30 flex items-center justify-center p-6">
            {tenancy.signedAgreementUrl ? (
              <iframe
                src={`${tenancy.signedAgreementUrl}#toolbar=0`}
                className="w-full h-full border-0 rounded-lg bg-card shadow-sm"
                title="Tenancy Agreement Preview"
              />
            ) : (
              <div className="text-center space-y-2">
                <FileText size={40} className="text-muted-foreground/40 mx-auto" />
                <p className="text-caption text-muted-foreground">
                  Tenancy agreement document is not loaded.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-surface p-4 space-y-4">
            <h3 className="text-overline text-muted-foreground">
              Property Information
            </h3>
            <div className="relative h-32 w-full rounded-xl overflow-hidden border border-border">
              <Image
                src={tenancy.property.image}
                alt={tenancy.property.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-h4 text-foreground">{tenancy.property.title}</p>
              <p className="text-caption text-muted-foreground mt-0.5">
                {tenancy.property.location}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
              {[
                { label: "Beds", value: tenancy.property.bedrooms || "3" },
                { label: "Baths", value: tenancy.property.bathrooms || "2.5" },
                { label: "sqft", value: tenancy.property.size || "1,200" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center bg-muted/50 p-2 rounded-lg"
                >
                  <span className="block text-sm font-bold text-foreground">
                    {item.value}
                  </span>
                  <span className="block text-overline text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-4 space-y-4">
            <h3 className="text-overline text-muted-foreground">
              {oppositeRole} Information
            </h3>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold text-sm">
                {oppositeParty.firstName[0]}
                {oppositeParty.lastName[0]}
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {oppositeParty.firstName} {oppositeParty.lastName}
                </p>
                <p className="text-overline text-muted-foreground">
                  {oppositeRole}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-border">
              <a
                href={`mailto:${oppositeParty.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-ui"
              >
                <Mail size={13} aria-hidden />
                <span className="text-sm">{oppositeParty.email}</span>
              </a>
              <a
                href={`tel:${oppositeParty.phone}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-ui"
              >
                <Phone size={13} aria-hidden />
                <span className="text-sm">{oppositeParty.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
