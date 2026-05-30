import { test, expect } from '../../fixtures/index';
import { UserFactory } from '../../data/user.factory';

test.describe('Registration', () => {
  test('should register new user with valid data @smoke', async ({ registerPage, page }) => {
    const user = UserFactory.create();
    await registerPage.register(user);
    await registerPage.expectSuccessRedirect();
  });

  test('should show error for existing email', async ({ registerPage }) => {
    const user = UserFactory.create({ email: 'admin@example.com' });
    await registerPage.register(user);
    await registerPage.expectFieldError('Email', 'Email already in use');
  });

  test('should show error for weak password', async ({ registerPage }) => {
    const user = UserFactory.create({ password: '123' });
    await registerPage.register(user);
    await registerPage.expectFieldError('Password', 'Password must be at least 8 characters');
  });

  test('should require terms acceptance', async ({ registerPage, page }) => {
    const user = UserFactory.create();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.emailInput.fill(user.email);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.confirmPasswordInput.fill(user.password);
    await registerPage.submitButton.click();
    await registerPage.expectFieldError('I agree to the terms', 'You must accept the terms');
  });

  test('should navigate back to login page', async ({ registerPage, page }) => {
    await registerPage.loginLink.click();
    await expect(page).toHaveURL('/login');
  });
});
