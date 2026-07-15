import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <div className="flex w-full flex-col justify-center px-8 sm:w-[50%] lg:px-16 xl:px-24 relative z-10">
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2.5 group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm ring-1 ring-primary/20 transition-ui group-hover:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4.5 w-4.5"
              aria-hidden
            >
              <polygon points="12 2 2 22 22 22" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-extrabold tracking-tight text-foreground group-hover:text-primary transition-ui">
              FieConnect
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-0.5">
              Ghana Rentals
            </span>
          </div>
        </Link>

        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>

      <div className="hidden sm:flex sm:w-[50%] items-center justify-center p-4 lg:p-6">
        <div className="relative h-full w-full overflow-hidden rounded-3xl bg-brand-green-dark shadow-2xl border border-brand-green/30">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
            alt="Modern apartment building in Ghana"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-brand-green-dark/60 to-transparent" />

          <div className="absolute top-10 left-10 right-10 rounded-2xl bg-card/90 p-5 shadow-xl backdrop-blur-md border border-border">
            <div className="text-sm font-bold text-card-foreground mb-1">
              Verified Rental Listings
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              Browse properties across all 16 regions of Ghana
            </div>
          </div>

          <div className="absolute bottom-12 left-10 right-10 rounded-2xl bg-card/85 p-6 shadow-xl backdrop-blur-xl border border-border space-y-3">
            <div className="text-sm font-bold text-card-foreground">
              Digital Tenancy Management
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Apply, sign leases, and manage your rental — all in one secure
              platform built for Ghanaian landlords and tenants.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden />
              Trusted by 12,000+ tenants
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
