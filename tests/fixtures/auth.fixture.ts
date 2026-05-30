import { test as base, Page, BrowserContext } from '@playwright/test';
import { AuthApi } from '../api/auth.api';
import { UsersApi } from '../api/users.api';
import { UserFactory } from '../data/user.factory';
import type { User, AuthToken } from '../data/types';

type AuthFixtures = {
  authenticatedPage: Page;
  adminPage: Page;
  authToken: AuthToken;
  createdUser: User & { id: string };
  authApi: AuthApi;
  usersApi: UsersApi;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'playwright/.auth/user.json',
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'playwright/.auth/admin.json',
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  authToken: async ({ request }, use) => {
    const authApi = new AuthApi(request);
    const response = await authApi.login(
      process.env.TEST_USER_EMAIL || 'user@example.com',
      process.env.TEST_USER_PASSWORD || 'UserPass123!'
    );
    await use(response.data);
  },

  createdUser: async ({ request }, use) => {
    const authApi = new AuthApi(request);
    const newUser = UserFactory.create();
    const response = await authApi.register(newUser);
    const createdUser = response.data as User & { id: string };
    await use(createdUser);

    const adminToken = await authApi.login(
      process.env.ADMIN_EMAIL || 'admin@example.com',
      process.env.ADMIN_PASSWORD || 'AdminPass123!'
    );
    const usersApi = new UsersApi(request, adminToken.data.accessToken);
    await usersApi.remove(createdUser.id);
  },

  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },

  usersApi: async ({ request, authToken }, use) => {
    await use(new UsersApi(request, authToken.accessToken));
  },
});

export { expect } from '@playwright/test';
