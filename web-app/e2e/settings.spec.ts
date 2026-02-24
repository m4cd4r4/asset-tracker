import { test, expect } from '@playwright/test';
import { DEMO_WORKSPACE_CONFIG } from './helpers/demo-config';

test.beforeEach(async ({ page }) => {
  await page.addInitScript((config) => {
    localStorage.clear();
    localStorage.setItem('euc_workspace_config', JSON.stringify(config));
  }, DEMO_WORKSPACE_CONFIG);
  await page.goto('/');
  await page.waitForSelector('table');
});

test('settings nav item is visible in sidebar', async ({ page, viewport }) => {
  if (viewport && viewport.width < 768) {
    await page.locator('header button').first().click();
    await page.waitForTimeout(300);
    const sidebar = page.locator('[role="dialog"]');
    await expect(sidebar.locator('button span:text-is("Settings")')).toBeVisible();
  } else {
    await expect(page.locator('aside button span:text-is("Settings")')).toBeVisible();
  }
});

test('clicking Settings shows settings panel with tabs', async ({ page, viewport }) => {
  if (viewport && viewport.width < 768) {
    await page.locator('header button').first().click();
    await page.waitForTimeout(300);
    await page.locator('[role="dialog"] button span:text-is("Settings")').click();
    await page.waitForTimeout(500);
  } else {
    await page.locator('aside button span:text-is("Settings")').click();
    await page.waitForTimeout(300);
  }

  // Settings panel should have tabs
  const main = page.locator('main');
  await expect(main.getByRole('tab', { name: 'Locations' })).toBeVisible({ timeout: 5000 });
  await expect(main.getByRole('tab', { name: 'Asset Types' })).toBeVisible();
  await expect(main.getByRole('tab', { name: 'Asset Number' })).toBeVisible();
  await expect(main.getByRole('tab', { name: 'Workspace' })).toBeVisible();
});

test('can add a new location in settings', async ({ page, viewport }) => {
  if (viewport && viewport.width < 768) {
    await page.locator('header button').first().click();
    await page.waitForTimeout(300);
    await page.locator('[role="dialog"] button span:text-is("Settings")').click();
    await page.waitForTimeout(500);
  } else {
    await page.locator('aside button span:text-is("Settings")').click();
    await page.waitForTimeout(300);
  }

  // Should see existing locations in the settings panel
  const main = page.locator('main');
  await expect(main.getByText('Basement 4.2')).toBeVisible({ timeout: 5000 });

  // Add a new location
  await main.getByPlaceholder('Location name').fill('Test Room');
  await main.getByPlaceholder('Short').last().fill('TR');
  await main.getByRole('button', { name: 'Add' }).click();

  // New location should appear
  await expect(main.getByText('Test Room')).toBeVisible();
});

test('SAN Registry uses dynamic display name', async ({ page, viewport }) => {
  if (viewport && viewport.width < 768) {
    await page.locator('header button').first().click();
    await page.waitForTimeout(300);
    await expect(page.locator('[role="dialog"] button span:text-is("SAN Registry")')).toBeVisible();
  } else {
    await expect(page.locator('aside button span:text-is("SAN Registry")')).toBeVisible();
  }
});

test('Add Item button is visible in inventory table', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Add Item' })).toBeVisible({ timeout: 5000 });
});
