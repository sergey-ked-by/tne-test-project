import { Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export class MailcatcherPage {
  constructor(public page: Page) { }

  private emailRow = (email: string) => this.page.locator(`//tr[td[contains(text(), "${email}")]]`);
  private completeRegistrationLink = () => this.page.frameLocator('iframe').locator('a:has-text("Complete Registration")');

  async findAndCompleteRegistration(email: string): Promise<void> {
    const mailcatcherUrl = 'https://developer:MDEzODcyNjY5NjEx@mailcatcher-qa.negsim.com';
    logger.info(`Navigating to Mailcatcher: ${mailcatcherUrl}`);
    await this.page.goto(mailcatcherUrl);

    logger.info(`Searching for email sent to: ${email}`);
    await this.emailRow(email).click();

    logger.info("Clicking 'Complete Registration' link in email");
    await this.completeRegistrationLink().click();
  }
}
