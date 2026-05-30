import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { RegisterPage } from '../pages/register.page';

type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  registerPage: RegisterPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
});

export { expect } from '@playwright/test';
