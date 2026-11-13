import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFoundPage() {
  const navT = useTranslations('nav');

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
        404
      </p>
      <h1 className="text-3xl font-bold text-text-primary">Page not found</h1>
      <Link
        href="/"
        className="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent-hover"
      >
        {navT('home')}
      </Link>
    </div>
  );
}
