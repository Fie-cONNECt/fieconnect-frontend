import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide whitespace-nowrap transition-ui',
  {
    variants: {
      status: {
        PENDING: 'bg-warning/15 text-warning-foreground border-warning/30',
        APPROVED: 'bg-success/10 text-success border-success/25',
        REJECTED: 'bg-destructive/10 text-destructive border-destructive/25',
        CANCELLED: 'bg-muted text-muted-foreground border-border',
        ACTIVE: 'bg-success/10 text-success border-success/25',
        OPEN: 'bg-primary/20 text-primary-foreground border-primary/40',
        RESOLVED: 'bg-muted text-muted-foreground border-border',
        CLOSED: 'bg-muted text-muted-foreground border-border',
        VERIFIED: 'bg-brand-green text-white border-brand-green',
        DEFAULT: 'bg-muted text-muted-foreground border-border',
      },
    },
    defaultVariants: {
      status: 'DEFAULT',
    },
  },
);

export type StatusKey =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'ACTIVE'
  | 'OPEN'
  | 'RESOLVED'
  | 'CLOSED'
  | 'VERIFIED'
  | 'DEFAULT';

interface StatusBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  status?: string;
  label?: string;
  className?: string;
}

function normalizeStatus(status?: string): StatusKey {
  if (!status) return 'DEFAULT';
  const key = status.toUpperCase().replace(/\s+/g, '_') as StatusKey;
  const known: StatusKey[] = [
    'PENDING',
    'APPROVED',
    'REJECTED',
    'CANCELLED',
    'ACTIVE',
    'OPEN',
    'RESOLVED',
    'CLOSED',
    'VERIFIED',
  ];
  return known.includes(key) ? key : 'DEFAULT';
}

export function StatusBadge({ status, label, className, ...props }: StatusBadgeProps) {
  const normalized = normalizeStatus(status);
  return (
    <span className={cn(statusBadgeVariants({ status: normalized }), className)} {...props}>
      {label || status || 'Unknown'}
    </span>
  );
}

export { statusBadgeVariants };
