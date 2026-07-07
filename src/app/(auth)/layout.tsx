import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Left side - Auth Form Container */}
      <div className="flex w-full flex-col justify-center px-8 sm:w-[50%] lg:px-16 xl:px-24 relative z-10">
        {/* Logo Area */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <polygon points="12 2 2 22 22 22"></polygon>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">fieConnect</span>
        </div>

        {/* Dynamic Form Content */}
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>

      {/* Right side - Image with Glassmorphism Mock */}
      <div className="hidden sm:flex sm:w-[50%] items-center justify-center p-4 lg:p-6">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-secondary shadow-2xl border border-border">
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop"
            alt="Modern Corporate Office"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute top-12 left-12 rounded-2xl bg-card/90 p-5 shadow-2xl backdrop-blur-md border border-border">
            <div className="text-sm font-bold text-card-foreground mb-1">
              Collaborative Workspace
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              Real-time team integrations
            </div>
          </div>

          <div className="absolute bottom-16 left-12 w-72 rounded-[2rem] bg-card/80 p-6 shadow-2xl backdrop-blur-xl border border-border">
            <div className="mb-2 text-sm font-bold text-card-foreground">Direct Connectivity</div>
            <div className="text-xs text-primary font-medium">99.9% Global Sync Efficiency</div>
            <div className="mt-4 flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-border bg-muted shadow-sm"
                />
              ))}
            </div>
          </div>

          <div className="absolute top-40 right-12 w-48 rounded-2xl bg-primary/95 p-4 shadow-2xl backdrop-blur-md border border-border">
            <div className="text-xs font-bold text-primary-foreground/80 mb-1 uppercase tracking-wider">
              Status
            </div>
            <div className="text-sm font-semibold text-primary-foreground">System Online</div>
          </div>

          <div className="absolute bottom-12 right-12 w-56 rounded-2xl bg-card/90 p-4 shadow-2xl backdrop-blur-xl border border-border">
            <div className="text-xs font-bold text-card-foreground mb-1">Active Resolvers</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-xs text-card-foreground/80">GraphQL Endpoints Loaded</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
