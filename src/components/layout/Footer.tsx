import { useTranslations } from 'next-intl';
import { SITE_CONFIG } from '@/config/site';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types/portfolio';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');

  return (
    <footer className="border-t border-border-subtle bg-bg-elevated/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-2">
          <p className="font-mono text-sm font-semibold text-text-primary">
            {SITE_CONFIG.owner.fullName}
          </p>
          <p className="text-xs text-text-secondary">{SITE_CONFIG.owner.roleTitle[locale]}</p>
          <p className="max-w-xl text-xs leading-relaxed text-text-muted">{t('privacyNote')}</p>
          <p className="text-xs text-text-muted">{t('builtWith')}</p>
        </div>

        <nav aria-label={t('navigation')} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/" className="text-text-muted transition-colors hover:text-text-primary">
            {navT('home')}
          </Link>
          <Link href="/about" className="text-text-muted transition-colors hover:text-text-primary">
            {navT('about')}
          </Link>
          <Link
            href="/experience"
            className="text-text-muted transition-colors hover:text-text-primary"
          >
            {navT('experience')}
          </Link>
          <Link
            href="/projects"
            className="text-text-muted transition-colors hover:text-text-primary"
          >
            {navT('projects')}
          </Link>
          <Link
            href="/contact"
            className="text-text-muted transition-colors hover:text-text-primary"
          >
            {navT('contact')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
