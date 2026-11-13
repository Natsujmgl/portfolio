'use client';

import { useState } from 'react';
import { Menu, Terminal, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SITE_CONFIG } from '@/config/site';
import { LanguageSwitcher } from '@/features/language/LanguageSwitcher';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/experience', key: 'experience' },
  { href: '/projects', key: 'projects' },
  { href: '/contact', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-bg-primary/90 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent-primary focus:px-3 focus:py-2 focus:text-xs focus:font-semibold focus:text-accent-foreground"
      >
        {t('skipToContent')}
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-text-primary transition-colors hover:text-accent-primary"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated text-accent-primary">
            <Terminal className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm">{SITE_CONFIG.owner.shortName}</span>
        </Link>

        <nav aria-label={t('primaryLabel')} className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ href, key }) => {
            const active = isActivePath(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-bg-muted text-text-primary'
                    : 'text-text-muted hover:bg-bg-muted/60 hover:text-text-primary'
                )}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated text-text-secondary transition-colors hover:text-text-primary md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          aria-label={t('primaryLabel')}
          className="border-t border-border-subtle bg-bg-primary px-4 py-3 md:hidden"
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ href, key }) => {
              const active = isActivePath(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-bg-muted text-text-primary'
                        : 'text-text-secondary hover:bg-bg-muted/60 hover:text-text-primary'
                    )}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

