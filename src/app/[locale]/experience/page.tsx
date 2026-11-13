import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { TechnicalSkillsGrid } from '@/components/sections/TechnicalSkillsGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EXPERIENCE_ITEMS, SKILL_CATEGORIES } from '@/content/experience';
import { buildLocalizedMetadata } from '@/lib/seo';
import type { Locale } from '@/types/portfolio';

interface ExperiencePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: 'metadata.experience' });

  return buildLocalizedMetadata({
    locale: typedLocale,
    pathname: '/experience',
    title: t('title'),
    description: t('description'),
  });
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  setRequestLocale(typedLocale);

  const t = await getTranslations('experience');

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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

      <section className="space-y-6">
        <SectionHeading title={t('timelineTitle')} />
        <ExperienceTimeline items={EXPERIENCE_ITEMS} locale={typedLocale} />
      </section>

      <section className="space-y-6">
        <SectionHeading title={t('skillsTitle')} />
        <TechnicalSkillsGrid categories={SKILL_CATEGORIES} locale={typedLocale} />
      </section>
    </div>
  );
}

