import { Page } from '@playwright/test';
import { logger } from '../utils/logger';

/**
 * Represents the base page with common functionalities shared across different pages.
 */
export class BasePage {
  constructor(public page: Page) {}

  /**
   * Navigates to a specified URL.
   * @param url The URL to navigate to.
   */
  async navigate(url: string) {
    logger.info(`⏩ Navigating to ${url}`);
    await this.page.goto(url);
  }
}