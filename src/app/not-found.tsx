import Link from "next/link";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="page-container py-6">
        <BrandLogoLink size="md" showTagline />
      </header>

      <main className="flex-1 page-container flex flex-col items-center justify-center text-center py-16">
        <p className="text-overline text-primary mb-3">404</p>
        <h1 className="text-display text-foreground max-w-lg">
          This page could not be found
        </h1>
        <p className="text-body text-muted-foreground mt-4 max-w-md">
          The link may be broken or the page may have been moved. Head back home
          or browse available rentals.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-xl font-semibold gap-2",
            )}
          >
            <Home size={16} aria-hidden />
            Go Home
          </Link>
          <Link
            href="/app/properties"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-xl font-semibold gap-2",
            )}
          >
            <ArrowLeft size={16} aria-hidden />
            Browse Properties
          </Link>
        </div>
      </main>
    </div>
  );
}
