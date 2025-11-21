import { Page, expect } from '@playwright/test';

import { logger } from '../utils/logger';
import { config } from '../configs/config';

export class SimHeaderPanel {
  constructor(public page: Page) { }

  private userName = () => this.page.locator('div.user-name');
  private userRole = () => this.page.locator('div.user-role');

  async VerifyUserNameRole(): Promise<void> {
    logger.info('✔️  Verifying user name visibility...');
    await expect(this.userName()).toBeVisible({ timeout: config.defaultTimeout });

    logger.info('✔️  Verifying user role visibility...');
    await expect(this.userRole()).toBeVisible({ timeout: config.defaultTimeout });

    logger.info('✅ User name and role are visible');
  }

  async verifyOnClassesPage(): Promise<void> {
    logger.info('✔️ Verifying that the user is on the classes page...');
    await expect(this.page).toHaveURL(/.*\/the-negotiation-experts\/classes/);
    logger.info('✅ User is on the classes page');
  }
}