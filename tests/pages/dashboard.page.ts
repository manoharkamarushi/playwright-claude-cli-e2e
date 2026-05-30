import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/base.page';
import { NavComponent } from '../components/nav.component';
import { TableComponent } from '../components/table.component';

export class DashboardPage extends BasePage {
  readonly welcomeHeading: Locator;
  readonly statsCards: Locator;
  readonly recentActivityTable: TableComponent;
  readonly nav: NavComponent;
  readonly userMenuButton: Locator;
  readonly notificationsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeHeading = page.getByRole('heading', { name: /Welcome/ });
    this.statsCards = page.getByTestId('stats-card');
    this.recentActivityTable = new TableComponent(page, '[data-testid="recent-activity-table"]');
    this.nav = new NavComponent(page);
    this.userMenuButton = page.getByTestId('user-menu-button');
    this.notificationsButton = page.getByRole('button', { name: 'Notifications' });
  }

  async goto(): Promise<void> {
    await this.navigate('/dashboard');
  }

  async expectWelcomeMessage(name: string): Promise<void> {
    await expect(this.welcomeHeading).toContainText(name);
  }

  async expectStatsCardCount(count: number): Promise<void> {
    await expect(this.statsCards).toHaveCount(count);
  }

  async getStatValue(label: string): Promise<string> {
    const card = this.page.getByTestId('stats-card').filter({ hasText: label });
    return card.getByTestId('stat-value').innerText();
  }

  async openUserMenu(): Promise<void> {
    await this.userMenuButton.click();
  }

  async logout(): Promise<void> {
    await this.openUserMenu();
    await this.page.getByRole('menuitem', { name: 'Sign out' }).click();
    await expect(this.page).toHaveURL('/login');
  }

  async navigateTo(section: string): Promise<void> {
    await this.nav.clickNavLink(section);
  }
}
