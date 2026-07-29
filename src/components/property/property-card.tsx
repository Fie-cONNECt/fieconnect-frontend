'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bed, Bath, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { cn } from '@/lib/utils';

export interface PropertyCardData {
  id: string | number;
  title: string;
  type?: string;
  location?: string;
  region?: string;
  price?: string | number;
  image?: string;
  verified?: boolean;
  bedrooms?: string | number;
  bathrooms?: string | number;
}

interface PropertyCardProps {
  property: PropertyCardData;
  href?: string;
  className?: string;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  ctaLabel?: string;
  compact?: boolean;
  reasons?: string[];
}

function formatPrice(price?: string | number) {
  if (price === undefined || price === null || price === '') return null;
  if (typeof price === 'string') return price;
  return `GH₵ ${price.toLocaleString()}`;
}

export function PropertyCard({
  property,
  href,
  className,
  showFavorite = false,
  isFavorite = false,
  onFavoriteToggle,
  ctaLabel = 'View Details',
  compact = false,
  reasons,
}: PropertyCardProps) {
  const detailHref = href ?? `/property/${property.id}`;
  const priceLabel = formatPrice(property.price);
  const imageSrc =
    property.image ||
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop';

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden card-surface-hover animate-in fade-in duration-500',
        compact ? 'rounded-xl' : 'rounded-2xl',
        className,
      )}
    >
      <div className={cn('relative w-full overflow-hidden bg-muted', compact ? 'h-36' : 'h-48')}>
        <Link href={detailHref} className="absolute inset-0 block" tabIndex={-1} aria-hidden>
          <Image
            src={imageSrc}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {property.verified && <StatusBadge status="VERIFIED" label="Verified" />}
            {property.type && (
              <span className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full border border-border/60 uppercase tracking-wide">
                {property.type}
              </span>
            )}
          </div>
          {showFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onFavoriteToggle?.();
              }}
              className={cn(
                'pointer-events-auto h-9 w-9 rounded-full flex items-center justify-center backdrop-blur-sm border transition-ui',
                isFavorite
                  ? 'bg-destructive/90 text-white border-destructive'
                  : 'bg-background/90 text-muted-foreground border-border hover:text-destructive',
              )}
              aria-label={isFavorite ? 'Remove from favorites' : 'Save property'}
              aria-pressed={isFavorite}
            >
              <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
            </button>
          )}
        </div>

        {priceLabel && (
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <span className="bg-secondary/90 text-secondary-foreground text-sm font-bold px-3 py-1.5 rounded-xl shadow-sm backdrop-blur-sm">
              {priceLabel}
              <span className="text-[10px] font-medium opacity-80 ml-1">/mo</span>
            </span>
          </div>
        )}
      </div>

      <div
        className={cn(
          'flex-1 flex flex-col justify-between',
          compact ? 'p-3 space-y-2' : 'p-5 space-y-4',
        )}
      >
        <div className="space-y-2">
          <h3 className="text-h4 text-foreground line-clamp-1 group-hover:text-primary transition-ui">
            <Link href={detailHref} className="focus-visible:rounded-md">
              {property.title}
            </Link>
          </h3>
          {(property.location || property.region) && (
            <div className="flex items-center gap-1.5 text-caption">
              <MapPin size={12} className="shrink-0 text-muted-foreground/80" aria-hidden />
              <span className="line-clamp-1">{property.location || property.region}</span>
            </div>
          )}
          {reasons && reasons.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {reasons.slice(0, compact ? 2 : 3).map((reason) => (
                <span
                  key={reason}
                  className="inline-flex max-w-full truncate rounded-full bg-brand-green-light text-brand-green text-[10px] font-semibold px-2 py-0.5 border border-brand-green/15"
                >
                  {reason}
                </span>
              ))}
            </div>
          )}
          {(property.bedrooms != null || property.bathrooms != null) && (
            <div className="flex items-center gap-3 text-caption pt-0.5">
              {property.bedrooms != null && (
                <span className="flex items-center gap-1">
                  <Bed size={12} aria-hidden />
                  {property.bedrooms}
                </span>
              )}
              {property.bathrooms != null && (
                <span className="flex items-center gap-1">
                  <Bath size={12} aria-hidden />
                  {property.bathrooms}
                </span>
              )}
            </div>
          )}
        </div>

        <Link href={detailHref} className="w-full">
          <Button
            variant="outline"
            className="w-full text-sm rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-ui font-semibold h-10"
          >
            {ctaLabel}
          </Button>
        </Link>
      </div>
    </article>
  );
}
