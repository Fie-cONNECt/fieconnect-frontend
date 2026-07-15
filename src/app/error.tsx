"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="page-container py-6">
        <BrandLogoLink size="md" showTagline />
      </header>

      <main className="flex-1 page-container flex flex-col items-center justify-center text-center py-16">
        <p className="text-overline text-destructive mb-3">Something went wrong</p>
        <h1 className="text-h1 text-foreground max-w-lg">
          We hit an unexpected error
        </h1>
        <p className="text-body text-muted-foreground mt-4 max-w-md">
          Please try again. If the problem continues, return home and contact
          support.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Button
            type="button"
            onClick={reset}
            className="rounded-xl font-semibold gap-2 h-11 px-5"
          >
            <RefreshCw size={16} aria-hidden />
            Try Again
          </Button>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-xl font-semibold gap-2",
            )}
          >
            <Home size={16} aria-hidden />
            Go Home
          </Link>
        </div>
      </main>
    </div>
  );
}
