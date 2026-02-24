import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, viewport }) => {
  test.skip(!!viewport && viewport.width < 768, 'Screenshot tests are desktop-only');
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/');
  await page.waitForSelector('table');
});

test('readme - light mode dashboard (Build Room)', async ({ page }) => {
  // Switch to Build Room which has low stock items
  const sidebar = page.locator('aside');
  await sidebar.getByText('Build Room').click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: './e2e/results/readme-light.png', fullPage: false });
});

test('readme - dark mode dashboard', async ({ page }) => {
  // Switch to Build Room
  const sidebar = page.locator('aside');
  await sidebar.getByText('Build Room').click();
  await page.waitForTimeout(300);

  // Toggle dark mode
  await sidebar.getByText('Dark mode').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: './e2e/results/readme-dark.png', fullPage: false });
});

test('readme - chart and activity (scrolled)', async ({ page }) => {
  const sidebar = page.locator('aside');
  await sidebar.getByText('Build Room').click();
  await page.waitForTimeout(300);

  // Scroll down to chart area
  await page.evaluate(() => {
    document.querySelector('main')?.scrollTo({ top: 600, behavior: 'instant' });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: './e2e/results/readme-chart.png', fullPage: false });
});
