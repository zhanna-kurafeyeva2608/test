import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work shows Client Work page', async ({ page }) => {
  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

  // Accept cookie banner if it appears (varies by region)
  const acceptCookies = page.getByRole('button', { name: /accept|agree/i });
  if (await acceptCookies.first().isVisible().catch(() => false)) {
    await acceptCookies.first().click();
  }

  // Open Services from header
  const servicesHeaderLink = page.getByRole('link', { name: /^services$/i });
  await servicesHeaderLink.click();

  // Click "Explore Our Client Work" link
  await page.getByRole('link', { name: /explore our client work/i }).click();

  // Verify "Client Work" text is visible
  await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
});
