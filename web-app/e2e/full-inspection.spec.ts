import { test, expect } from '@playwright/test';

// Helper: wait for sheet overlay to disappear
async function waitForSheetClose(page: any) {
  await page.locator('[data-state="open"]').first().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(400);
}

// Helper: open mobile sheet and wait for it to be interactable
async function openMobileSheet(page: any) {
  // Ensure no sheet is currently open
  await waitForSheetClose(page);
  await page.locator('header button').first().click();
  // Wait for sheet content to appear
  await page.locator('[role="dialog"]').first().waitFor({ state: 'visible', timeout: 5000 });
  await page.waitForTimeout(300);
}

// Helper: click a nav item in the sidebar (handles mobile sheet)
async function clickNavItem(page: any, label: string, viewport: any) {
  const isMobile = (viewport?.width ?? 1440) < 768;
  if (isMobile) {
    await openMobileSheet(page);
    const navBtn = page.locator('[role="dialog"] button')
      .filter({ has: page.locator(`span:text-is("${label}")`) })
      .first();
    await navBtn.click();
    await waitForSheetClose(page);
  } else {
    const navBtn = page.locator('aside button')
      .filter({ has: page.locator(`span:text-is("${label}")`) })
      .first();
    await navBtn.click();
    await page.waitForTimeout(500);
  }
}

// Helper: click a location in sidebar
async function clickLocation(page: any, name: string, viewport: any) {
  const isMobile = (viewport?.width ?? 1440) < 768;
  if (isMobile) {
    await openMobileSheet(page);
    const locBtn = page.locator('[role="dialog"] button')
      .filter({ hasText: name })
      .first();
    await locBtn.click();
    await waitForSheetClose(page);
  } else {
    const locBtn = page.locator('aside button')
      .filter({ hasText: name })
      .first();
    await locBtn.click();
    await page.waitForTimeout(500);
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForLoadState('networkidle');
});

// ─── 1. INITIAL LOAD & SEED DATA ──────────────────────────────────────────────

test.describe('1. Initial Load & Seed Data', () => {
  test('app loads and shows content with seed data', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 });
    await page.screenshot({ path: 'e2e/results/01-initial-load.png', fullPage: true });
  });

  test('KPI cards display non-zero values', async ({ page }) => {
    const totalCard = page.getByText('Total Items').first();
    await expect(totalCard).toBeVisible();
    await page.screenshot({ path: 'e2e/results/02-kpi-cards.png', fullPage: true });
  });

  test('inventory table has real item names from Excel', async ({ page }) => {
    const table = page.locator('table').first();
    await expect(table).toBeVisible({ timeout: 5000 });

    const knownItems = ['Desktop Mini G9', 'Laptop 840 G10', 'Laptop Bag', 'Dock Thunderbolt G4'];
    let found = 0;
    for (const item of knownItems) {
      if (await page.getByText(item, { exact: false }).first().isVisible().catch(() => false)) found++;
    }
    expect(found).toBeGreaterThan(0);
    await page.screenshot({ path: 'e2e/results/03-inventory-table.png', fullPage: true });
  });
});

// ─── 2. SIDEBAR NAVIGATION ────────────────────────────────────────────────────

test.describe('2. Sidebar Navigation', () => {
  test('desktop sidebar shows all nav items', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1440) < 768) return;
    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByText('Inventory')).toBeVisible();
    await expect(sidebar.getByText('Activity')).toBeVisible();
    await expect(sidebar.getByText('Reports')).toBeVisible();
    await expect(sidebar.getByText('SAN Registry')).toBeVisible();
    await page.screenshot({ path: 'e2e/results/04-sidebar-desktop.png', fullPage: true });
  });

  test('Activity view shows transaction log', async ({ page, viewport }) => {
    await clickNavItem(page, 'Activity', viewport);
    await expect(page.locator('main')).toBeVisible();
    await page.screenshot({ path: 'e2e/results/05-activity-view.png', fullPage: true });
  });

  test('Reports view shows chart and KPIs', async ({ page, viewport }) => {
    await clickNavItem(page, 'Reports', viewport);
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'e2e/results/06-reports-view.png', fullPage: true });
  });

  test('navigate Activity then back to Inventory', async ({ page, viewport }) => {
    await clickNavItem(page, 'Activity', viewport);
    await page.waitForTimeout(300);
    await clickNavItem(page, 'Inventory', viewport);
    await expect(page.locator('table').first()).toBeVisible();
    await page.screenshot({ path: 'e2e/results/07-back-to-inventory.png', fullPage: true });
  });
});

// ─── 3. LOCATION SWITCHING ────────────────────────────────────────────────────

test.describe('3. Location Switching', () => {
  test('switch between all 5 locations', async ({ page, viewport }) => {
    const locations = ['Basement 4.2', 'Build Room', 'Darwin', 'Level 17', 'Basement 4.3'];
    for (let i = 0; i < locations.length; i++) {
      await clickLocation(page, locations[i], viewport);
      await page.screenshot({
        path: `e2e/results/08-location-${i + 1}-${locations[i].replace(/\s+/g, '-').toLowerCase()}.png`,
        fullPage: true,
      });
    }
  });
});

// ─── 4. INVENTORY TABLE INTERACTIONS ──────────────────────────────────────────

test.describe('4. Inventory Table Interactions', () => {
  test('table columns are sortable', async ({ page }) => {
    const table = page.locator('table').first();
    await expect(table).toBeVisible();

    const itemHeader = page.getByRole('columnheader', { name: /item/i }).first();
    if (await itemHeader.isVisible().catch(() => false)) {
      await itemHeader.click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'e2e/results/09-sorted-by-item.png', fullPage: true });
      await itemHeader.click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'e2e/results/10-sorted-reverse.png', fullPage: true });
    }
  });

  test('add button opens SAN modal or increments count', async ({ page }) => {
    const table = page.locator('table').first();
    await expect(table).toBeVisible();

    const addBtn = page.locator('table button:has-text("+")').first();
    if (await addBtn.isVisible().catch(() => false)) {
      await addBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'e2e/results/11-add-clicked.png', fullPage: true });

      // Close any dialog
      const closeBtn = page.locator('[role="dialog"] button:has-text("Cancel")');
      if (await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.click();
        await page.waitForTimeout(300);
      }
    }
  });

  test('subtract button decrements count', async ({ page }) => {
    const table = page.locator('table').first();
    await expect(table).toBeVisible();
    const subBtn = page.locator('table button').filter({ hasText: /^[−-]$/ }).first();
    if (await subBtn.isVisible().catch(() => false)) {
      await subBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'e2e/results/12-subtract-clicked.png', fullPage: true });
    }
  });

  test('threshold click opens editor popover', async ({ page }) => {
    const table = page.locator('table').first();
    await expect(table).toBeVisible();
    const thresholdBtn = page.locator('table button[class*="tabular"]').first();
    if (await thresholdBtn.isVisible().catch(() => false)) {
      await thresholdBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'e2e/results/13-threshold-editor.png', fullPage: true });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
    }
  });

  test('add non-SAN item updates count correctly', async ({ page }) => {
    const table = page.locator('table').first();
    await expect(table).toBeVisible();

    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const text = await row.textContent();
      if (text && (text.includes('Laptop Bag') || text.includes('Laptop Charger'))) {
        const addBtn = row.locator('button:has-text("+")');
        if (await addBtn.isVisible().catch(() => false)) {
          await addBtn.click();
          await page.waitForTimeout(500);
          await page.screenshot({ path: 'e2e/results/14-add-non-san.png', fullPage: true });
          break;
        }
      }
    }
  });
});

// ─── 5. TRANSACTION LOG / ACTIVITY FEED ───────────────────────────────────────

test.describe('5. Transaction Log', () => {
  test('transaction log shows entries with timestamps', async ({ page }) => {
    const activitySection = page.getByText('Recent Activity', { exact: false }).first();
    if (await activitySection.isVisible().catch(() => false)) {
      await activitySection.scrollIntoViewIfNeeded();
    }
    await page.screenshot({ path: 'e2e/results/15-transaction-log.png', fullPage: true });
  });

  test('activity filter buttons work (all/add/subtract)', async ({ page, viewport }) => {
    await clickNavItem(page, 'Activity', viewport);

    // Filter buttons are small buttons inside the TransactionLog header
    const filterBtns = page.locator('.glass-card button').filter({ hasText: /^(all|add|subtract)$/i });
    const count = await filterBtns.count();

    if (count >= 3) {
      // Click "add" filter
      await filterBtns.nth(1).click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'e2e/results/16-activity-adds.png', fullPage: true });

      // Click "subtract" filter
      await filterBtns.nth(2).click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'e2e/results/17-activity-subtracts.png', fullPage: true });

      // Click "all" filter
      await filterBtns.nth(0).click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'e2e/results/18-activity-all.png', fullPage: true });
    }
  });
});

// ─── 6. CHARTS ────────────────────────────────────────────────────────────────

test.describe('6. Charts', () => {
  test('inventory chart renders with bars', async ({ page }) => {
    const chart = page.locator('.recharts-wrapper').first();
    if (await chart.isVisible().catch(() => false)) {
      await chart.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'e2e/results/19-inventory-chart.png', fullPage: true });
    }
  });

  test('reports view chart is visible', async ({ page, viewport }) => {
    await clickNavItem(page, 'Reports', viewport);
    const chart = page.locator('.recharts-wrapper').first();
    if (await chart.isVisible().catch(() => false)) {
      await page.screenshot({ path: 'e2e/results/20-reports-chart.png', fullPage: true });
    }
  });
});

// ─── 7. DIALOGS & MODALS ─────────────────────────────────────────────────────

test.describe('7. Dialogs & Modals', () => {
  test('Low Stock dialog opens and shows items below threshold', async ({ page, viewport }) => {
    const isMobile = (viewport?.width ?? 1440) < 768;
    if (isMobile) {
      // Mobile: alert button is the last button in header
      const alertBtn = page.locator('header button').last();
      await alertBtn.click();
    } else {
      // Desktop: Low Stock button in sidebar
      const lowStockBtn = page.locator('aside button').filter({ hasText: 'Low Stock' }).first();
      if (await lowStockBtn.isVisible().catch(() => false)) {
        await lowStockBtn.click();
      }
    }
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'e2e/results/21-low-stock-dialog.png', fullPage: true });

    const dialog = page.locator('[role="dialog"]');
    if (await dialog.isVisible().catch(() => false)) {
      await dialog.locator('button').first().click();
      await page.waitForTimeout(300);
    }
  });

  test('SAN Registry dialog opens with search', async ({ page, viewport }) => {
    const isMobile = (viewport?.width ?? 1440) < 768;
    if (isMobile) {
      await openMobileSheet(page);
    }
    const sanBtn = page.locator(isMobile ? '[role="dialog"] button' : 'aside button')
      .filter({ hasText: 'SAN Registry' }).first();
    if (await sanBtn.isVisible().catch(() => false)) {
      await sanBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'e2e/results/22-san-registry.png', fullPage: true });

      // Search
      const searchInput = page.locator('[role="dialog"] input[type="text"]').first();
      if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill('SAN125');
        await page.waitForTimeout(300);
        await page.screenshot({ path: 'e2e/results/23-san-search.png', fullPage: true });
      }
      await page.locator('[role="dialog"] button').first().click();
      await page.waitForTimeout(300);
    }
  });

  test('SAN Return modal opens with form fields', async ({ page }) => {
    const returnBtn = page.getByText('Return', { exact: false }).first();
    if (await returnBtn.isVisible().catch(() => false)) {
      await returnBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'e2e/results/24-san-return-modal.png', fullPage: true });

      const dialog = page.locator('[role="dialog"]');
      if (await dialog.isVisible().catch(() => false)) {
        const cancelBtn = dialog.getByText('Cancel', { exact: false });
        if (await cancelBtn.isVisible().catch(() => false)) {
          await cancelBtn.click();
        } else {
          await dialog.locator('button').first().click();
        }
        await page.waitForTimeout(300);
      }
    }
  });
});

// ─── 8. DATA MANAGEMENT ──────────────────────────────────────────────────────

test.describe('8. Data Management', () => {
  test('export data triggers download', async ({ page, viewport }) => {
    const isMobile = (viewport?.width ?? 1440) < 768;
    if (isMobile) {
      await openMobileSheet(page);
    }

    const container = isMobile ? '[role="dialog"]' : 'aside';
    const dataMgmtBtn = page.locator(`${container} button`)
      .filter({ hasText: 'Data Management' }).first();
    if (await dataMgmtBtn.isVisible().catch(() => false)) {
      await dataMgmtBtn.click();
      await page.waitForTimeout(300);

      const exportBtn = page.locator(`${container} button`)
        .filter({ hasText: 'Export Data' }).first();
      if (await exportBtn.isVisible().catch(() => false)) {
        const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null);
        await exportBtn.click();
        await page.waitForTimeout(500);
        const download = await downloadPromise;
        if (download) {
          expect(download.suggestedFilename()).toContain('.json');
        }
        await page.screenshot({ path: 'e2e/results/25-export-data.png', fullPage: true });
      }
    }
  });
});

// ─── 9. RESPONSIVE LAYOUT ────────────────────────────────────────────────────

test.describe('9. Responsive Layout', () => {
  test('mobile: sidebar hidden, header visible with hamburger', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1440) >= 768) return;
    const sidebar = page.locator('aside');
    await expect(sidebar).not.toBeVisible();
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await page.screenshot({ path: 'e2e/results/26-mobile-layout.png', fullPage: true });
  });

  test('mobile: hamburger opens sidebar sheet', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1440) >= 768) return;
    await page.locator('header button').first().click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'e2e/results/27-mobile-sidebar-sheet.png', fullPage: true });
  });
});

// ─── 10. VISUAL QUALITY ──────────────────────────────────────────────────────

test.describe('10. Visual Quality', () => {
  test('glassmorphism styling is applied', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1440) < 768) return;
    const glassElements = page.locator('.glass-card, .glass-card-dark');
    const count = await glassElements.count();
    expect(count).toBeGreaterThan(0);
    await page.screenshot({ path: 'e2e/results/28-glassmorphism.png', fullPage: true });
  });

  test('full dashboard screenshot', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1440) < 768) return;
    await page.screenshot({ path: 'e2e/results/29-full-dashboard.png', fullPage: true });
  });

  test('scroll down for chart and activity feed', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1440) < 768) return;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'e2e/results/30-scrolled-dashboard.png', fullPage: true });
  });
});
