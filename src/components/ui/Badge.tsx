import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'accent' | 'outline' | 'warning' | 'success';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-bg-muted text-text-secondary border-border-subtle',
  accent: 'bg-accent-subtle text-accent-primary border-accent-primary/30',
  outline: 'bg-transparent text-text-secondary border-border-strong',
  warning: 'bg-amber-500/10 text-status-warning border-amber-500/30',
  success: 'bg-emerald-500/10 text-status-success border-emerald-500/30',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 font-mono text-xs font-medium leading-5',
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
