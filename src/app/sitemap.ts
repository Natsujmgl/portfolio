import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site';
import { CASE_STUDIES } from '@/content/case-studies';

const STATIC_PATHS = ['', '/about', '/experience', '/projects', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '');
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of SITE_CONFIG.locales) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es${path}`,
            en: `${baseUrl}/en${path}`,
          },
        },
      });
    }
  }

  for (const study of CASE_STUDIES) {
    const path = `/projects/${study.slug}`;
    for (const locale of SITE_CONFIG.locales) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: {
          languages: {
            es: `${baseUrl}/es${path}`,
            en: `${baseUrl}/en${path}`,
          },
        },
      });
    }
  }

  return entries;
}
