import { test, expect } from '../../fixtures/index';

test.describe('Dashboard', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('should display welcome message @smoke', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    await expect(page).toHaveURL('/dashboard');
    await expect(dashboardPage.welcomeHeading).toBeVisible();
  });

  test('should display stats cards', async ({ dashboardPage }) => {
    await dashboardPage.goto();
    await dashboardPage.expectStatsCardCount(4);
  });

  test('should navigate to users section via nav', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    await dashboardPage.navigateTo('Users');
    await expect(page).toHaveURL('/users');
  });

  test('should navigate to settings via nav', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    await dashboardPage.navigateTo('Settings');
    await expect(page).toHaveURL('/settings');
  });

  test('should logout via user menu @smoke', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    await dashboardPage.logout();
    await expect(page).toHaveURL('/login');
  });

  test('should display recent activity table', async ({ dashboardPage }) => {
    await dashboardPage.goto();
    await dashboardPage.recentActivityTable.waitForVisible();
  });
});

test.describe('Dashboard - Admin', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('should show admin-only controls', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    await expect(page.getByRole('link', { name: 'Admin panel' })).toBeVisible();
  });
});
