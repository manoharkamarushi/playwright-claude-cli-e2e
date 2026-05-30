import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from '../base/base.component';

export class ModalComponent extends BaseComponent {
  readonly title: Locator;
  readonly body: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page, '[role="dialog"]');
    this.title = this.root.getByRole('heading');
    this.body = this.root.getByTestId('modal-body');
    this.confirmButton = this.root.getByRole('button', { name: /confirm|yes|ok/i });
    this.cancelButton = this.root.getByRole('button', { name: /cancel|no/i });
    this.closeButton = this.root.getByRole('button', { name: 'Close' });
  }

  async confirm(): Promise<void> {
    await this.confirmButton.click();
    await this.waitForHidden();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
    await this.waitForHidden();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await this.waitForHidden();
  }

  async closeWithEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.waitForHidden();
  }

  async expectTitle(title: string): Promise<void> {
    await expect(this.title).toHaveText(title);
  }

  async expectBodyText(text: string | RegExp): Promise<void> {
    await expect(this.body).toContainText(text);
  }
}
