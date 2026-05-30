import { Page, expect } from '@playwright/test';
import { BaseComponent } from '../base/base.component';

export class NavComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, 'nav[aria-label="Main navigation"]');
  }

  async clickNavLink(label: string): Promise<void> {
    await this.root.getByRole('link', { name: label }).click();
  }

  async expectActiveLink(label: string): Promise<void> {
    const link = this.root.getByRole('link', { name: label });
    await expect(link).toHaveAttribute('aria-current', 'page');
  }

  async expectNavVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
  }

  async getNavLinks(): Promise<string[]> {
    const links = this.root.getByRole('link');
    const count = await links.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).innerText();
      texts.push(text.trim());
    }
    return texts;
  }
}
