import type { Metadata } from 'next';
import { ArrowRight, Compass, Cpu, Layers, Shield, Users } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Link } from '@/i18n/navigation';
import { buildLocalizedMetadata } from '@/lib/seo';
import type { Locale } from '@/types/portfolio';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: 'metadata.about' });

  return buildLocalizedMetadata({
    locale: typedLocale,
    pathname: '/about',
    title: t('title'),
    description: t('description'),
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  setRequestLocale(typedLocale);

  const t = await getTranslations('about');
  const commonT = await getTranslations('common');

  const pillars = [
    { key: 'enterprise', icon: Layers },
    { key: 'fullstack', icon: Compass },
    { key: 'legacySecurity', icon: Shield },
    { key: 'devopsAi', icon: Cpu },
    { key: 'leadership', icon: Users },
  ] as const;

  return (
    <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="space-y-4 border-b border-border-subtle pb-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
          {t('eyebrow')}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {t('title')}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {t('intro')}
        </p>
      </header>

      <section className="space-y-6">
        <SectionHeading title={t('pillarsTitle')} />

        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map(({ key, icon: Icon }) => (
            <Card key={key} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-accent-subtle text-accent-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-text-primary">
                  {t(`pillars.${key}.title`)}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {t(`pillars.${key}.description`)}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border-subtle bg-bg-elevated p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-text-primary">{t('readingLevelsTitle')}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">
          {t('readingLevelsDescription')}
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary hover:text-accent-hover"
          >
            <span>{commonT('viewAllCases')}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary"
          >
            <span>{commonT('viewExperience')}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
