import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sizeClasses = {
  xs: "text-base",
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
} as const;

const markSizeClasses = {
  xs: "h-6 w-6",
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
} as const;

const taglineSizeClasses = {
  xs: "text-[7px]",
  sm: "text-[8px]",
  md: "text-[9px]",
  lg: "text-[10px]",
  xl: "text-[11px]",
} as const;

export type BrandLogoSize = keyof typeof sizeClasses;
export type BrandLogoTone = "dark" | "light";

interface BrandLogoProps {
  size?: BrandLogoSize;
  className?: string;
  /** "dark" = for light backgrounds (default), "light" = for dark backgrounds */
  tone?: BrandLogoTone;
  showMark?: boolean;
  showTagline?: boolean;
}

export function BrandLogo({
  size = "md",
  className,
  tone = "dark",
  showMark = true,
  showTagline = false,
}: BrandLogoProps) {
  const light = tone === "light";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {showMark && (
        <span
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center",
            markSizeClasses[size],
          )}
          aria-hidden
        >
          <Image
            src="/logo-mark.png"
            alt=""
            fill
            sizes="48px"
            className="object-contain"
          />
        </span>
      )}
      <span className="inline-flex flex-col leading-none">
        <span
          className={cn(
            "font-extrabold tracking-tight",
            sizeClasses[size],
            light ? "text-white" : "text-foreground",
          )}
        >
          Fie
          <span className="text-primary">Connect</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "font-semibold uppercase tracking-[0.2em] mt-1",
              taglineSizeClasses[size],
              light ? "text-white/50" : "text-muted-foreground",
            )}
          >
            Premium Property
          </span>
        )}
      </span>
    </span>
  );
}

interface BrandLogoLinkProps extends BrandLogoProps {
  href?: string;
  linkClassName?: string;
  onClick?: () => void;
}

export function BrandLogoLink({
  href = "/",
  size = "md",
  className,
  tone = "dark",
  showMark = true,
  showTagline = false,
  linkClassName,
  onClick,
}: BrandLogoLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="FieConnect home"
      className={cn(
        "group inline-flex shrink-0 items-center rounded-lg transition-ui hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        linkClassName,
      )}
    >
      <BrandLogo
        size={size}
        className={className}
        tone={tone}
        showMark={showMark}
        showTagline={showTagline}
      />
    </Link>
  );
}
