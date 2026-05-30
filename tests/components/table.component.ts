import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from '../base/base.component';

export class TableComponent extends BaseComponent {
  readonly headers: Locator;
  readonly rows: Locator;
  readonly emptyState: Locator;
  readonly pagination: Locator;

  constructor(page: Page, rootSelector: string) {
    super(page, rootSelector);
    this.headers = this.root.getByRole('columnheader');
    this.rows = this.root.getByRole('row').filter({ hasNot: this.root.getByRole('columnheader') });
    this.emptyState = this.root.getByTestId('empty-state');
    this.pagination = this.root.getByTestId('pagination');
  }

  async getRowCount(): Promise<number> {
    return this.rows.count();
  }

  async getHeaderTexts(): Promise<string[]> {
    const count = await this.headers.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      texts.push((await this.headers.nth(i).innerText()).trim());
    }
    return texts;
  }

  async getCellValue(rowIndex: number, columnHeader: string): Promise<string> {
    const headers = await this.getHeaderTexts();
    const colIndex = headers.indexOf(columnHeader);
    if (colIndex === -1) throw new Error(`Column "${columnHeader}" not found`);
    const cell = this.rows.nth(rowIndex).getByRole('cell').nth(colIndex);
    return (await cell.innerText()).trim();
  }

  async clickRowAction(rowIndex: number, actionLabel: string): Promise<void> {
    await this.rows.nth(rowIndex).getByRole('button', { name: actionLabel }).click();
  }

  async sortByColumn(columnHeader: string): Promise<void> {
    await this.headers.filter({ hasText: columnHeader }).click();
  }

  async expectRowCount(count: number): Promise<void> {
    await expect(this.rows).toHaveCount(count);
  }

  async expectEmptyState(): Promise<void> {
    await expect(this.emptyState).toBeVisible();
    await expect(this.rows).toHaveCount(0);
  }

  async searchInTable(searchTerm: string): Promise<void> {
    const searchInput = this.root.getByRole('searchbox');
    await searchInput.fill(searchTerm);
  }

  async goToNextPage(): Promise<void> {
    await this.pagination.getByRole('button', { name: 'Next page' }).click();
  }

  async goToPreviousPage(): Promise<void> {
    await this.pagination.getByRole('button', { name: 'Previous page' }).click();
  }
}
