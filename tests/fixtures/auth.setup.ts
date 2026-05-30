import { test as setup, expect } from '@playwright/test';
import { ENV } from '../../config/env';

const authFile = 'playwright/.auth/user.json';
const adminAuthFile = 'playwright/.auth/admin.json';

setup('authenticate as regular user', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(ENV.TEST_USER_EMAIL);
  await page.getByLabel('Password').fill(ENV.TEST_USER_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/dashboard');
  await page.context().storageState({ path: authFile });
});

setup('authenticate as admin', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(ENV.ADMIN_EMAIL);
  await page.getByLabel('Password').fill(ENV.ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/dashboard');
  await page.context().storageState({ path: adminAuthFile });
});
