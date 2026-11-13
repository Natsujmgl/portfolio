import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CopyEmailButton } from '@/components/sections/CopyEmailButton';
import { ExternalLinksList } from '@/components/sections/ExternalLinksList';
import { Card } from '@/components/ui/Card';
import { SITE_CONFIG } from '@/config/site';
import { buildLocalizedMetadata } from '@/lib/seo';
import type { Locale } from '@/types/portfolio';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: 'metadata.contact' });

  return buildLocalizedMetadata({
    locale: typedLocale,
    pathname: '/contact',
    title: t('title'),
    description: t('description'),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  setRequestLocale(typedLocale);

  const t = await getTranslations('contact');
  const availabilityItems = t.raw('availabilityItems') as string[];

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="space-y-3 border-b border-border-subtle pb-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
          {t('eyebrow')}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {t('title')}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
          {t('subtitle')}
        </p>
      </header>

      <Card className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">{t('directEmailTitle')}</h2>
        <CopyEmailButton email={SITE_CONFIG.links.email.displayValue ?? ''} />
        <p className="text-xs text-text-muted">{t('directEmailNote')}</p>
      </Card>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-text-primary">{t('profilesTitle')}</h2>
          <p className="text-sm text-text-secondary">{t('profilesDescription')}</p>
        </div>
        <ExternalLinksList locale={typedLocale} />
      </section>

      <Card className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">{t('availabilityTitle')}</h2>
        <ul className="space-y-2.5 text-sm text-text-secondary">
          {availabilityItems.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
