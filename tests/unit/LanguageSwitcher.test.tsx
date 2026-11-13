import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageSwitcher } from '@/features/language/LanguageSwitcher';
import esMessages from '../../messages/es.json';

const replaceMock = vi.fn();

vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/projects',
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    replaceMock.mockClear();
  });

  it('marks active locale and navigates to target locale while preserving route', async () => {
    const user = userEvent.setup();

    render(
      <NextIntlClientProvider locale="es" messages={esMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    const esButton = screen.getByRole('button', { name: esMessages.language.es });
    const enButton = screen.getByRole('button', { name: esMessages.language.en });

    expect(esButton).toHaveAttribute('aria-pressed', 'true');
    expect(enButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(enButton);
    expect(replaceMock).toHaveBeenCalledWith('/projects', { locale: 'en' });
  });
});
