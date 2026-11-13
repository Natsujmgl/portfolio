'use client';

import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type ThemeOption = 'light' | 'dark' | 'system';

const OPTIONS: { value: ThemeOption; icon: typeof Sun }[] = [
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
  { value: 'system', icon: Monitor },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('theme');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? (theme ?? 'system') : 'system';

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="inline-flex items-center rounded-lg border border-border-subtle bg-bg-muted p-0.5"
    >
      {OPTIONS.map(({ value, icon: Icon }) => {
        const isSelected = activeTheme === value;
        const label = t(value);

        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={label}
            aria-pressed={isSelected}
            title={label}
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors',
              isSelected
                ? 'bg-bg-elevated text-text-primary shadow-sm ring-1 ring-border-subtle'
                : 'text-text-muted hover:text-text-primary'
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

