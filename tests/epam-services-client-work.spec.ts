import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work shows Client Work page', async ({ page }) => {
  // 1. Navigate to https://www.epam.com/services
  await page.goto('https://www.epam.com/services', { waitUntil: 'domcontentloaded' });

  // Handle potential cookie banner if present
  const acceptCookies = page.getByRole('button', { name: /accept|agree/i });
  if (await acceptCookies.isVisible().catch(() => false)) {
    await acceptCookies.click();
  }

  // 2. Select "Services" from the header menu (already on /services, but ensure it is selected)
  const servicesHeaderLink = page.getByRole('link', { name: /^services$/i }).first();
  if (await servicesHeaderLink.isVisible().catch(() => false)) {
    await servicesHeaderLink.click();
  }

  // 3. Click the "Explore Our Client Work" link.
  await page.getByRole('link', { name: /explore our client work/i }).click();

  // 4. Verify that the "Client Work" text is visible on the page.
  await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
});
