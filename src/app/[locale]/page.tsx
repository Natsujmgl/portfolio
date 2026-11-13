import type { Metadata } from 'next';
import { ArrowRight, Bot, Layers, ShieldCheck } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CaseStudyCard } from '@/components/projects/CaseStudyCard';
import { CopyEmailButton } from '@/components/sections/CopyEmailButton';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { ExternalLinksList } from '@/components/sections/ExternalLinksList';
import { TechnicalSkillsGrid } from '@/components/sections/TechnicalSkillsGrid';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE_CONFIG } from '@/config/site';
import { CASE_STUDIES } from '@/content/case-studies';
import { EXPERIENCE_ITEMS, SKILL_CATEGORIES } from '@/content/experience';
import { Link } from '@/i18n/navigation';
import { buildLocalizedMetadata } from '@/lib/seo';
import type { Locale } from '@/types/portfolio';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: 'metadata.home' });

  return buildLocalizedMetadata({
    locale: typedLocale,
    pathname: '/',
    title: t('title'),
    description: t('description'),
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  setRequestLocale(typedLocale);

  const t = await getTranslations('home');
  const commonT = await getTranslations('common');

  const specializations = [
    {
      key: 'enterprise',
      icon: Layers,
    },
    {
      key: 'security',
      icon: ShieldCheck,
    },
    {
      key: 'ai',
      icon: Bot,
    },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Hero */}
      <section className="space-y-8 border-b border-border-subtle pb-14">
        <div className="space-y-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
            {t('eyebrow')}
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {SITE_CONFIG.owner.fullName}
            </h1>
            <p className="font-mono text-sm font-medium text-text-secondary sm:text-base">
              {SITE_CONFIG.owner.roleTitle[typedLocale]}
            </p>
          </div>
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-text-primary sm:text-xl">
            {t('headline')}
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
            {t('summary')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            <span>{t('primaryCta')}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-bg-elevated px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent-primary hover:text-accent-primary"
          >
            <span>{t('secondaryCta')}</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent-primary"
          >
            <span>{commonT('viewAbout')}</span>
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {['PHP / Laravel', 'PostgreSQL & MySQL', 'OWASP / Checkmarx', 'AI Agents & MCP'].map(
            (chip) => (
              <Badge key={chip} variant="outline">
                {chip}
              </Badge>
            )
          )}
        </div>
      </section>

      {/* Core Specializations */}
      <Reveal>
        <section className="space-y-8">
          <SectionHeading
            eyebrow={t('specializationsEyebrow')}
            title={t('specializationsTitle')}
            description={t('specializationsDescription')}
          />

          <div className="grid gap-5 md:grid-cols-3">
            {specializations.map(({ key, icon: Icon }) => (
              <Card key={key} className="space-y-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-accent-subtle text-accent-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-text-primary">
                  {t(`specializations.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {t(`specializations.${key}.description`)}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Featured Case Studies */}
      <Reveal>
        <section className="space-y-8">
          <SectionHeading
            eyebrow={t('featuredEyebrow')}
            title={t('featuredTitle')}
            description={t('featuredDescription')}
            action={
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary hover:text-accent-hover"
              >
                <span>{commonT('viewAllCases')}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />

          <div className="grid gap-5 md:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard key={study.slug} study={study} locale={typedLocale} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* Experience Summary */}
      <Reveal>
        <section className="space-y-8">
          <SectionHeading
            eyebrow={t('experienceEyebrow')}
            title={t('experienceTitle')}
            description={t('experienceDescription')}
            action={
              <Link
                href="/experience"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary hover:text-accent-hover"
              >
                <span>{commonT('viewExperience')}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />

          <ExperienceTimeline items={EXPERIENCE_ITEMS} locale={typedLocale} compact />
        </section>
      </Reveal>

      {/* Technical Skills */}
      <Reveal>
        <section className="space-y-8">
          <SectionHeading
            eyebrow={t('skillsEyebrow')}
            title={t('skillsTitle')}
            description={t('skillsDescription')}
          />

          <TechnicalSkillsGrid categories={SKILL_CATEGORIES} locale={typedLocale} />
        </section>
      </Reveal>

      {/* Contact & External Links */}
      <Reveal>
        <section className="space-y-8 rounded-2xl border border-border-subtle bg-bg-elevated/70 p-6 sm:p-8">
          <SectionHeading
            eyebrow={t('linksEyebrow')}
            title={t('linksTitle')}
            description={t('linksDescription')}
          />

          <CopyEmailButton email={SITE_CONFIG.links.email.displayValue ?? ''} />

          <ExternalLinksList locale={typedLocale} />
        </section>
      </Reveal>
    </div>
  );
}
