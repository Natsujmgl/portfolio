'use client';

import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/portfolio';

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('language');

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    // Persist user locale preference in cookie for next-intl middleware
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="inline-flex items-center gap-1 rounded-lg border border-border-subtle bg-bg-muted p-0.5"
    >
      <span className="sr-only">{t('label')}</span>
      <Languages className="ml-1.5 h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
      {LOCALES.map(({ code, label }) => {
        const isSelected = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => handleSwitch(code)}
            aria-label={t(code)}
            aria-pressed={isSelected}
            className={cn(
              'rounded-md px-2 py-1 font-mono text-xs font-medium transition-colors',
              isSelected
                ? 'bg-bg-elevated text-text-primary shadow-sm ring-1 ring-border-subtle'
                : 'text-text-muted hover:text-text-primary'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
