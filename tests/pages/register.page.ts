import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/base.page';
import type { User } from '../data/types';

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly termsCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByLabel('First name');
    this.lastNameInput = page.getByLabel('Last name');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.confirmPasswordInput = page.getByLabel('Confirm password');
    this.submitButton = page.getByRole('button', { name: 'Create account' });
    this.loginLink = page.getByRole('link', { name: 'Sign in' });
    this.termsCheckbox = page.getByLabel('I agree to the terms');
  }

  async goto(): Promise<void> {
    await this.navigate('/register');
  }

  async register(user: Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.termsCheckbox.check();
    await this.submitButton.click();
  }

  async expectFieldError(fieldLabel: string, errorMessage: string): Promise<void> {
    const field = this.page.getByLabel(fieldLabel);
    const errorLocator = field.locator('..').getByRole('alert');
    await expect(errorLocator).toHaveText(errorMessage);
  }

  async expectSuccessRedirect(): Promise<void> {
    await expect(this.page).toHaveURL('/verify-email');
  }
}
