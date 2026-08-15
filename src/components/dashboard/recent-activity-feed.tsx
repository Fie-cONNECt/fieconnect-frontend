'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import {
  Eye,
  Bookmark,
  FileText,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type RecentActivityItem = {
  id: string;
  type: string;
  title: string;
  subtitle?: string | null;
  status?: string | null;
  link: string;
  createdAt: string;
  property?: {
    id: string;
    title: string;
    location: string;
    image: string;
    price: number;
  } | null;
};

const TYPE_META: Record<
  string,
  { icon: typeof Eye; label: string; tone: string; iconClass: string }
> = {
  VIEWED_PROPERTY: {
    icon: Eye,
    label: 'Viewed',
    tone: 'bg-sky-500/10 text-sky-700 border-sky-500/20',
    iconClass: 'bg-sky-500/10 text-sky-700',
  },
  SAVED_PROPERTY: {
    icon: Bookmark,
    label: 'Saved',
    tone: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    iconClass: 'bg-amber-500/10 text-amber-700',
  },
  APPLIED: {
    icon: FileText,
    label: 'Applied',
    tone: 'bg-primary/10 text-primary border-primary/20',
    iconClass: 'bg-primary/10 text-primary',
  },
  APPLICATION_UPDATED: {
    icon: RefreshCw,
    label: 'Update',
    tone: 'bg-violet-500/10 text-violet-700 border-violet-500/20',
    iconClass: 'bg-violet-500/10 text-violet-700',
  },
  DISPUTE_OPENED: {
    icon: AlertTriangle,
    label: 'Dispute',
    tone: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    iconClass: 'bg-orange-500/10 text-orange-700',
  },
  DISPUTE_UPDATED: {
    icon: AlertTriangle,
    label: 'Dispute',
    tone: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    iconClass: 'bg-orange-500/10 text-orange-700',
  },
};

/** Approx. row height (padding + content + gap) for a fixed 7-item viewport. */
const ROW_HEIGHT_PX = 88;
const ROW_GAP_PX = 10;

function statusTone(status?: string | null): string {
  if (!status) return 'bg-muted text-muted-foreground border-border';
  const s = status.toUpperCase();
  if (s === 'PENDING' || s === 'OPEN' || s === 'INFORMATION_REQUESTED') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }
  if (s === 'REJECTED' || s === 'CANCELLED') {
    return 'bg-destructive/10 text-destructive border-destructive/20';
  }
  if (s === 'SAVED' || s === 'VIEWED' || s === 'APPROVED' || s === 'RESOLVED') {
    return 'bg-primary/10 text-primary border-primary/20';
  }
  if (s === 'APPROVED_PENDING_SIGNATURE') {
    return 'bg-violet-500/10 text-violet-700 border-violet-500/20';
  }
  return 'bg-muted text-muted-foreground border-border';
}

function relativeTime(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return '';
  }
}

type Props = {
  items: RecentActivityItem[];
  className?: string;
  /** Items shown per page (default 7). */
  pageSize?: number;
};

export function RecentActivityFeed({ items, className, pageSize = 7 }: Props) {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);

  const pageItems = useMemo(() => {
    const start = safePage * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, pageSize, safePage]);

  const listHeight = pageSize * ROW_HEIGHT_PX + (pageSize - 1) * ROW_GAP_PX;

  if (items.length === 0) {
    return (
      <div className={cn('text-center py-10 px-4 space-y-4', className)}>
        <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center ring-1 ring-brand-green/20">
          <Sparkles size={20} />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-bold text-foreground">Your activity will show up here</p>
          <p className="text-xs text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">
            View listings, save favorites, and submit applications — we’ll keep a clear timeline of
            what you’ve done.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <Link href="/app/properties">
            <Button className="h-9 rounded-xl text-xs font-bold px-4 cursor-pointer">
              Browse properties
            </Button>
          </Link>
          <Link href="/app/onboarding">
            <Button
              variant="outline"
              className="h-9 rounded-xl text-xs font-bold px-4 cursor-pointer"
            >
              Update preferences
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-3 min-w-0 w-full', className)}>
      <div
        className="overflow-y-auto overflow-x-hidden pr-1 -mr-1 min-w-0 w-full"
        style={{ height: listHeight, maxHeight: listHeight }}
      >
        <div className="space-y-2.5">
          {pageItems.map((act) => {
            const meta = TYPE_META[act.type] || TYPE_META.VIEWED_PROPERTY;
            const Icon = meta.icon;
            const time = relativeTime(act.createdAt);

            return (
              <Link key={act.id} href={act.link} className="block">
                <div
                  className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border border-border bg-card/60 hover:bg-muted/50 hover:border-border transition-ui"
                  style={{ minHeight: ROW_HEIGHT_PX }}
                >
                  {act.property?.image ? (
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-border bg-muted">
                      <Image
                        src={act.property.image}
                        alt={act.property.title}
                        fill
                        className="object-cover"
                      />
                      <span
                        className={cn(
                          'absolute -bottom-1 -right-1 h-6 w-6 rounded-lg border border-card flex items-center justify-center shadow-sm',
                          meta.iconClass,
                        )}
                      >
                        <Icon size={12} />
                      </span>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        'h-11 w-11 rounded-xl flex items-center justify-center shrink-0',
                        meta.iconClass,
                      )}
                    >
                      <Icon size={16} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={cn(
                          'text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border',
                          meta.tone,
                        )}
                      >
                        {meta.label}
                      </span>
                      {time && (
                        <span className="text-[10px] text-muted-foreground font-medium">
                          {time}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-foreground leading-snug mt-1 truncate">
                      {act.title}
                    </h4>
                    {(act.subtitle || act.property?.location) && (
                      <p className="text-[11px] text-muted-foreground font-medium truncate mt-0.5 flex items-center gap-1">
                        {!act.property?.image && <Building2 size={10} className="shrink-0" />}
                        {act.subtitle || act.property?.location}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {act.status && (
                      <span
                        className={cn(
                          'hidden sm:inline-flex text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border max-w-[9rem] truncate',
                          statusTone(act.status),
                        )}
                      >
                        {act.status.replace(/_/g, ' ')}
                      </span>
                    )}
                    <ChevronRight
                      size={14}
                      className="text-muted-foreground group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Page {safePage + 1} of {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage <= 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="h-8 w-8 p-0 rounded-lg cursor-pointer"
              aria-label="Previous activity page"
            >
              <ChevronLeft size={14} />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="h-8 w-8 p-0 rounded-lg cursor-pointer"
              aria-label="Next activity page"
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
