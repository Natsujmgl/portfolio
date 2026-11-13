import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border-subtle bg-bg-elevated p-6 transition-colors',
        className
      )}
    >
      {children}
    </div>
  );
}

