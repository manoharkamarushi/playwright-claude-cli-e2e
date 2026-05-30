import { Page, Locator, expect } from '@playwright/test';

export abstract class BaseComponent {
  protected readonly page: Page;
  protected readonly root: Locator;

  constructor(page: Page, rootSelector: string) {
    this.page = page;
    this.root = page.locator(rootSelector);
  }

  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }

  async waitForVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
  }

  async waitForHidden(): Promise<void> {
    await expect(this.root).toBeHidden();
  }

  protected getByRole(role: Parameters<Locator['getByRole']>[0], options?: Parameters<Locator['getByRole']>[1]): Locator {
    return this.root.getByRole(role, options);
  }

  protected getByText(text: string | RegExp): Locator {
    return this.root.getByText(text);
  }

  protected getByLabel(label: string | RegExp): Locator {
    return this.root.getByLabel(label);
  }

  protected getByTestId(testId: string): Locator {
    return this.root.getByTestId(testId);
  }
}
