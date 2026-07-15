import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  href?: string;
  tone?: 'default' | 'primary' | 'warning' | 'success' | 'destructive';
  className?: string;
}

const toneStyles = {
  default: {
    value: 'text-foreground',
    icon: 'bg-muted text-muted-foreground',
  },
  primary: {
    value: 'text-primary',
    icon: 'bg-primary/10 text-primary',
  },
  warning: {
    value: 'text-warning-foreground',
    icon: 'bg-warning/15 text-warning-foreground',
  },
  success: {
    value: 'text-success',
    icon: 'bg-success/10 text-success',
  },
  destructive: {
    value: 'text-destructive',
    icon: 'bg-destructive/10 text-destructive',
  },
};

export function StatCard({
  label,
  value,
  icon,
  href,
  tone = 'primary',
  className,
}: StatCardProps) {
  const styles = toneStyles[tone];

  const content = (
    <div
      className={cn(
        'card-surface p-5 flex items-center justify-between gap-4 text-left',
        href && 'card-surface-hover cursor-pointer interactive-scale',
        className,
      )}
    >
      <div className="min-w-0">
        <div className="text-overline mb-2">{label}</div>
        <div className={cn('text-3xl font-extrabold leading-none tracking-tight', styles.value)}>
          {value}
        </div>
      </div>
      {icon && (
        <div
          className={cn(
            'h-11 w-11 rounded-full flex items-center justify-center shrink-0',
            styles.icon,
          )}
        >
          {icon}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus-visible:rounded-2xl">
        {content}
      </Link>
    );
  }

  return content;
}
