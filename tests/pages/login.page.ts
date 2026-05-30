import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly registerLink: Locator;
  readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByRole('alert');
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.registerLink = page.getByRole('link', { name: 'Create account' });
    this.rememberMeCheckbox = page.getByLabel('Remember me');
  }

  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async loginWithRememberMe(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.submitButton.click();
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async clearForm(): Promise<void> {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }
}
