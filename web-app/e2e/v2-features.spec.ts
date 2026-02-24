import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/');
  await page.waitForSelector('table');
});

test('sidebar shows OCR button in Quick Actions', async ({ page, viewport }) => {
  if (viewport && viewport.width < 768) {
    // On mobile, open the sidebar sheet via hamburger
    await page.locator('header button').first().click();
    await page.waitForTimeout(300);
  }
  const sidebar = viewport && viewport.width < 768
    ? page.locator('[role="dialog"]')
    : page.locator('aside');
  await expect(sidebar.getByText('OCR')).toBeVisible();
});

test('sidebar shows Scan, OCR, and Count buttons', async ({ page, viewport }) => {
  if (viewport && viewport.width < 768) {
    await page.locator('header button').first().click();
    await page.waitForTimeout(300);
  }
  const sidebar = viewport && viewport.width < 768
    ? page.locator('[role="dialog"]')
    : page.locator('aside');
  await expect(sidebar.getByText('Scan')).toBeVisible();
  await expect(sidebar.getByText('OCR')).toBeVisible();
  await expect(sidebar.getByText('Count')).toBeVisible();
});

test('SAN Registry rows have barcode icon buttons', async ({ page, viewport }) => {
  if (viewport && viewport.width < 768) {
    await page.locator('header button').first().click();
    await page.waitForTimeout(300);
  }
  const sidebar = viewport && viewport.width < 768
    ? page.locator('[role="dialog"]')
    : page.locator('aside');
  await sidebar.getByText('SAN Registry').click();

  const dialog = page.locator('[role="dialog"]').last();
  await expect(dialog).toBeVisible();

  const barcodeButtons = dialog.locator('button[title="Show barcode"]');
  await expect(barcodeButtons.first()).toBeVisible();
  expect(await barcodeButtons.count()).toBeGreaterThan(0);
});

test('barcode dialog opens from SAN Registry', async ({ page, viewport }) => {
  if (viewport && viewport.width < 768) {
    await page.locator('header button').first().click();
    await page.waitForTimeout(300);
  }
  const sidebar = viewport && viewport.width < 768
    ? page.locator('[role="dialog"]')
    : page.locator('aside');
  await sidebar.getByText('SAN Registry').click();

  const dialog = page.locator('[role="dialog"]').last();
  await expect(dialog).toBeVisible();

  const barcodeButton = dialog.locator('button[title="Show barcode"]').first();
  await barcodeButton.click();

  // Wait for barcode generation (async canvas rendering)
  await page.waitForTimeout(500);

  // BarcodeDisplay dialog should appear with barcode images
  await expect(page.getByText('Code 128', { exact: true })).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('QR Code', { exact: true })).toBeVisible();
  await expect(page.getByText('Download')).toBeVisible();
  await expect(page.getByText('Copy SAN')).toBeVisible();
});
