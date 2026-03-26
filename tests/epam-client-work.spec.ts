import { test, expect, chromium } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work shows Client Work page', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // Accept cookie banner if it appears (varies by region)
    const oneTrustAccept = page.locator('#onetrust-accept-btn-handler');
    if (await oneTrustAccept.isVisible().catch(() => false)) {
      await oneTrustAccept.click();
    }

    // Select "Services" from the header menu
    const servicesHeaderLink = page.getByRole('link', { name: /^services$/i });
    await servicesHeaderLink.click();
    await page.waitForLoadState('domcontentloaded');

    // Click "Explore Our Client Work" link.
    await page.getByRole('link', { name: /explore our client work/i }).click();

    // Verify that the "Client Work" text is visible on the page.
    await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
  } finally {
    // Always close the browser once the scenario is executed
    await browser.close();
  }
});
