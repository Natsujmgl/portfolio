import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CASE_STUDIES } from '@/content/case-studies';
import { ProjectFilterBar } from '@/features/project-filters/ProjectFilterBar';
import esMessages from '../../messages/es.json';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('ProjectFilterBar', () => {
  it('filters professional case studies by category', async () => {
    const user = userEvent.setup();

    render(
      <NextIntlClientProvider locale="es" messages={esMessages}>
        <ProjectFilterBar caseStudies={CASE_STUDIES} locale="es" />
      </NextIntlClientProvider>
    );

    expect(screen.getAllByRole('article')).toHaveLength(4);

    await user.click(screen.getByRole('button', { name: esMessages.projects.filters.security }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(
      screen.getByText('Endurecimiento de Seguridad en Aplicación Legacy')
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: esMessages.projects.filters.all }));
    expect(screen.getAllByRole('article')).toHaveLength(4);
  });
});

