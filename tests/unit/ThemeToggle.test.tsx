import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import esMessages from '../../messages/es.json';

const setThemeMock = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'system',
    setTheme: setThemeMock,
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    setThemeMock.mockClear();
  });

  it('renders light, dark, and system buttons and updates theme on click', async () => {
    const user = userEvent.setup();

    render(
      <NextIntlClientProvider locale="es" messages={esMessages}>
        <ThemeToggle />
      </NextIntlClientProvider>
    );

    const lightBtn = screen.getByRole('button', { name: esMessages.theme.light });
    const darkBtn = screen.getByRole('button', { name: esMessages.theme.dark });
    const systemBtn = screen.getByRole('button', { name: esMessages.theme.system });

    expect(systemBtn).toHaveAttribute('aria-pressed', 'true');

    await user.click(darkBtn);
    expect(setThemeMock).toHaveBeenCalledWith('dark');

    await user.click(lightBtn);
    expect(setThemeMock).toHaveBeenCalledWith('light');
  });
});

