import { Page, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { logger } from '../utils/logger';

export class AccountProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private successMessage = () => this.page.getByText('You’ve successfully activated your account', { exact: true });

  async verifyAccountActivation(): Promise<void> {
    logger.info("⏳ Waiting for account profile page to load");
    await this.page.waitForURL('**/account/profile');
    
    logger.info("Verifying account activation success message is visible");
    await expect(this.successMessage()).toBeVisible();

    logger.info("Verifying URL is correct");
    expect(this.page.url()).toContain('/account/profile');
  }
}
