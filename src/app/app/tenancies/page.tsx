"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../layout";
import { requestGQL } from "../../../lib/graphql-client";
import { MY_TENANCIES_QUERY } from "../../../graphql/operations";
import { Button } from "../../../components/ui/button";
import { isLandlord } from "../../../lib/utils";
import {
  Key,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Skeleton } from "../../../components/ui/skeleton";
import { PageHeader, EmptyState } from "@/components/layout";
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
        console.error("Failed to load tenancies:", err);
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
          <Skeleton className="h-8 w-48 bg-muted" />
          <Skeleton className="h-4 w-72 bg-muted/80" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full bg-muted rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Active Tenancies"
        description={
          landlordMode
            ? "Manage and monitor all active leases and tenants for your properties."
            : "Access your active tenancy agreement details and contact information."
        }
      />

      {tenancies.length === 0 ? (
        <EmptyState
          icon={<Key size={24} />}
          title="No active tenancies"
          description="Active lease agreements will appear here once tenancy agreements are signed by both parties."
          action={
            <Link href="/app/applications">
              <Button className="rounded-xl font-semibold">
                Check Applications
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenancies.map((tenancy) => {
            const oppositeParty = landlordMode
              ? tenancy.tenant
              : tenancy.property.landlord;
            return (
              <div
                key={tenancy.id}
                className="card-surface-hover overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 w-full bg-muted border-b border-border">
                    <Image
                      src={tenancy.property.image}
                      alt={tenancy.property.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <StatusBadge status="ACTIVE" label="Active" />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-foreground/85 text-background font-bold text-xs px-3 py-1 rounded-lg">
                      GH₵ {tenancy.property.price.toLocaleString()} / mo
                    </div>
                  </div>

                  <div className="p-4 space-y-4 text-left">
                    <div>
                      <h3 className="text-h4 text-foreground line-clamp-1">
                        {tenancy.property.title}
                      </h3>
                      <p className="text-caption text-muted-foreground mt-0.5">
                        {tenancy.property.location}
                      </p>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-xl flex items-center gap-3">
                      <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs font-bold">
                        {oppositeParty.firstName[0]}
                        {oppositeParty.lastName[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {oppositeParty.firstName} {oppositeParty.lastName}
                        </p>
                        <p className="text-overline text-muted-foreground">
                          {landlordMode ? "Tenant" : "Landlord"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-caption text-muted-foreground">
                      <Calendar size={13} />
                      <span>
                        Lease commenced:{" "}
                        {new Date(
                          isNaN(Number(tenancy.updatedAt))
                            ? tenancy.updatedAt
                            : parseInt(tenancy.updatedAt),
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 mt-auto">
                  <Link href={`/app/tenancies/${tenancy.id}`}>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl font-semibold gap-1.5"
                    >
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
