import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-zinc-950 via-slate-900 to-black text-white">
      {/* Left side - Auth Form Container */}
      <div className="flex w-full flex-col justify-center px-8 sm:w-[50%] lg:px-16 xl:px-24 relative z-10">
        {/* Logo Area */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
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
          <span className="text-lg font-bold tracking-tight text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            fieConnect
          </span>
        </div>

        {/* Dynamic Form Content */}
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>

      {/* Right side - Image with Glassmorphism Mock */}
      <div className="hidden sm:flex sm:w-[50%] items-center justify-center p-4 lg:p-6">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-zinc-900 shadow-2xl border border-zinc-800">
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop"
            alt="Modern Corporate Office"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute top-12 left-12 rounded-2xl bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-md border border-white/10">
            <div className="text-sm font-bold text-white mb-1">Collaborative Workspace</div>
            <div className="text-xs text-white/50 font-medium">Real-time team integrations</div>
          </div>

          <div className="absolute bottom-16 left-12 w-72 rounded-[2rem] bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-xl border border-white/10">
            <div className="mb-2 text-sm font-bold text-white">Direct Connectivity</div>
            <div className="text-xs text-indigo-300 font-medium">99.9% Global Sync Efficiency</div>
            <div className="mt-4 flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-zinc-800 bg-zinc-700 shadow-sm"
                />
              ))}
            </div>
          </div>

          <div className="absolute top-40 right-12 w-48 rounded-2xl bg-indigo-600/90 p-4 shadow-2xl backdrop-blur-md border border-white/10">
            <div className="text-xs font-bold text-indigo-100 mb-1 uppercase tracking-wider">
              Status
            </div>
            <div className="text-sm font-semibold text-white">System Online</div>
          </div>

          <div className="absolute bottom-12 right-12 w-56 rounded-2xl bg-zinc-950/90 p-4 shadow-2xl backdrop-blur-xl border border-white/10">
            <div className="text-xs font-bold text-white mb-1">Active Resolvers</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-xs text-white/80">GraphQL Endpoints Loaded</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
