import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/');
});

test('shows setup wizard on fresh visit', async ({ page }) => {
  await expect(page.getByText('Asset Tracker')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('Load Demo')).toBeVisible();
  await expect(page.getByText('Start Fresh')).toBeVisible();
});

test('Load Demo creates workspace with Perth data', async ({ page, viewport }) => {
  await page.getByText('Load Demo').click();

  // Should show the dashboard with inventory table
  await expect(page.locator('table')).toBeVisible({ timeout: 10000 });

  if (viewport && viewport.width < 768) {
    // On mobile, open sidebar sheet to check locations
    await page.locator('header button').first().click();
    await page.waitForTimeout(300);
    const sidebar = page.locator('[role="dialog"]');
    await expect(sidebar.getByText('Basement 4.2')).toBeVisible();
    await expect(sidebar.getByText('Build Room')).toBeVisible();
    await expect(sidebar.getByText('Perth IT Inventory')).toBeVisible();
  } else {
    const sidebar = page.locator('aside');
    await expect(sidebar.getByText('Basement 4.2')).toBeVisible();
    await expect(sidebar.getByText('Build Room')).toBeVisible();
    await expect(sidebar.getByText('Darwin')).toBeVisible();
    await expect(sidebar.getByText('Perth IT Inventory')).toBeVisible();
  }
});

test('Start Fresh flow creates empty workspace', async ({ page, viewport }) => {
  await page.getByText('Start Fresh').click();
  await expect(page.getByText('New Workspace')).toBeVisible();

  await page.getByPlaceholder('e.g. London Office IT, Lab Equipment').fill('Test Lab');
  await page.getByPlaceholder('e.g. Main Warehouse').fill('Room A');
  await page.getByPlaceholder('Short').fill('RM-A');
  await page.getByText('Create Workspace').click();

  // Should show dashboard
  await expect(page.locator('main')).toBeVisible({ timeout: 10000 });

  if (viewport && viewport.width < 768) {
    await page.locator('header button').first().click();
    await page.waitForTimeout(300);
    const sidebar = page.locator('[role="dialog"]');
    await expect(sidebar.getByText('Test Lab')).toBeVisible();
    await expect(sidebar.getByText('Room A')).toBeVisible();
  } else {
    const sidebar = page.locator('aside');
    await expect(sidebar.getByText('Test Lab')).toBeVisible();
    await expect(sidebar.getByText('Room A')).toBeVisible();
  }
});

test('Start Fresh back button returns to choose screen', async ({ page }) => {
  await page.getByText('Start Fresh').click();
  await expect(page.getByText('New Workspace')).toBeVisible();

  await page.getByText('Back').click();
  await expect(page.getByText('Load Demo')).toBeVisible();
});
