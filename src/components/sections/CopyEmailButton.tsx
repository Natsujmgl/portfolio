'use client';

import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const t = useTranslations('common');
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        setStatus('error');
        return;
      }
      await navigator.clipboard.writeText(email);
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 2500);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={cn('inline-flex flex-wrap items-center gap-2', className)}>
      <div className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-muted px-3 py-2 font-mono text-xs text-text-primary sm:text-sm">
        <Mail className="h-4 w-4 shrink-0 text-accent-primary" aria-hidden="true" />
        <span className="break-all">{email}</span>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-bg-elevated px-3 py-2 text-xs font-medium text-text-primary transition-colors hover:border-accent-primary hover:text-accent-primary"
      >
        {status === 'copied' ? (
          <Check className="h-3.5 w-3.5 text-status-success" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span>
          {status === 'copied'
            ? t('emailCopied')
            : status === 'error'
              ? t('copyError')
              : t('copyEmail')}
        </span>
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {status === 'copied' ? t('emailCopied') : status === 'error' ? t('copyError') : ''}
      </span>
    </div>
  );
}
