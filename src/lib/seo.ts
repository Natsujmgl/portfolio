import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';
import type { Locale } from '@/types/portfolio';

interface LocalizedMetadataOptions {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
}

export function buildLocalizedMetadata({
  locale,
  pathname,
  title,
  description,
}: LocalizedMetadataOptions): Metadata {
  const normalizedPath = pathname === '/' ? '' : pathname;
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}/${locale}${normalizedPath}`;
  const esUrl = `${baseUrl}/es${normalizedPath}`;
  const enUrl = `${baseUrl}/en${normalizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: esUrl,
        en: enUrl,
        'x-default': esUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: `${SITE_CONFIG.owner.shortName} · Portfolio`,
      locale: locale === 'es' ? 'es_PY' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_PY'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

