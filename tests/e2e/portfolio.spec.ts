import { expect, test } from '@playwright/test';

test.describe('Portfolio E2E', () => {
  test('renders Spanish default home, switches to English, toggles theme, and inspects case study', async ({
    page,
  }) => {
    await page.goto('/es');

    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', { name: 'Julio Miguel Giménez León' })).toBeVisible();

    // Switch to English
    await page.getByRole('button', { name: 'Cambiar a Inglés' }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // Toggle Dark Theme
    await page.getByRole('button', { name: 'Dark theme' }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Navigate to Projects & Case Studies
    await page.getByRole('link', { name: 'Projects & Cases' }).first().click();
    await expect(page).toHaveURL(/\/en\/projects$/);

    // Open Case Study 03 (AI Automation) and step simulator
    await page.getByRole('link', { name: 'Explore case study' }).nth(2).click();
    await expect(page).toHaveURL(/\/en\/projects\/ai-development-automation$/);
    await expect(page.getByText('Jira Ticket (1/7)')).toBeVisible();
  });
});
