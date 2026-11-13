import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

