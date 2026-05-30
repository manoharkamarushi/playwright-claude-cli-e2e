import { test, expect } from '../../fixtures/index';
import { ADMIN_USER, TEST_USER } from '../../data/seeds';

test.describe('Login', () => {
  test('should login with valid credentials @smoke @critical', async ({ loginPage, page }) => {
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await expect(page).toHaveURL('/dashboard');
  });

  test('should login as admin @smoke', async ({ loginPage, page }) => {
    await loginPage.login(ADMIN_USER.email, ADMIN_USER.password);
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid@example.com', 'wrongpassword');
    await loginPage.expectErrorMessage('Invalid email or password');
  });

  test('should show error for empty email', async ({ loginPage }) => {
    await loginPage.login('', TEST_USER.password);
    await loginPage.expectErrorMessage('Email is required');
  });

  test('should show error for empty password', async ({ loginPage }) => {
    await loginPage.login(TEST_USER.email, '');
    await loginPage.expectErrorMessage('Password is required');
  });

  test('should navigate to forgot password page', async ({ loginPage, page }) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL('/forgot-password');
  });

  test('should navigate to register page', async ({ loginPage, page }) => {
    await loginPage.registerLink.click();
    await expect(page).toHaveURL('/register');
  });

  test('should preserve email on failed login', async ({ loginPage }) => {
    await loginPage.login(TEST_USER.email, 'wrongpassword');
    await expect(loginPage.emailInput).toHaveValue(TEST_USER.email);
  });

  test('should login with remember me checked', async ({ loginPage, page }) => {
    await loginPage.loginWithRememberMe(TEST_USER.email, TEST_USER.password);
    await expect(page).toHaveURL('/dashboard');
  });

  const invalidEmailFormats = [
    'notanemail',
    'missing@domain',
    '@nodomain.com',
    'spaces in@email.com',
  ];

  for (const email of invalidEmailFormats) {
    test(`should reject malformed email: "${email}"`, async ({ loginPage }) => {
      await loginPage.login(email, TEST_USER.password);
      await loginPage.expectErrorMessage('Invalid email format');
    });
  }
});
