import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract goto(): Promise<void>;

  protected navigate(path: string): Promise<void> {
    return this.page.goto(path);
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async takeScreenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async waitForToast(message: string): Promise<void> {
    const toast = this.page.getByRole('alert').filter({ hasText: message });
    await expect(toast).toBeVisible();
  }

  async waitForSuccessToast(message: string): Promise<void> {
    const toast = this.page.locator('[data-testid="toast-success"]').filter({ hasText: message });
    await expect(toast).toBeVisible();
  }

  async waitForErrorToast(message: string): Promise<void> {
    const toast = this.page.locator('[data-testid="toast-error"]').filter({ hasText: message });
    await expect(toast).toBeVisible();
  }

  async expectPageTitle(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  async expectURL(urlOrPattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(urlOrPattern);
  }

  async scrollToBottom(): Promise<void> {
    await this.page.keyboard.press('End');
  }

  async scrollToTop(): Promise<void> {
    await this.page.keyboard.press('Home');
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
