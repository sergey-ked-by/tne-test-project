import { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { User } from '../models/User';
import { logger } from '../utils/logger';

/**
 * Represents the login page and its functionalities.
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  private emailInput = () => this.page.locator('input[name="email"]');
  private passwordInput = () => this.page.locator('input[type="password"]');
  private loginButton = () => this.page.locator('button[data-automation="login-button-layout-login"]');
  private createAccountButton = () => this.page.locator('button[data-automation="navigate-to-create-n-acc-button-layout-login"]');
  private errorMessage = () => this.page.locator('div.error span');

  /**
   * Logs in a user with the provided credentials.
   * @param user The user object containing username and password.
   */
  async login(user: User): Promise<void> {
    logger.info(`✏️  Specify email: ${user.username}`);
    await this.emailInput().fill(user.username);
    logger.info("✏️  Specify password: *****");
    await this.passwordInput().fill(user.password);
    logger.info("🖱️  Click login button");
    await this.loginButton().click();
    logger.info("⏳ Wait for successful login");
    await this.page.waitForURL('**/the-negotiation-experts/groups/**/negotiators');
  }

  /**
   * Navigates to the registration page.
   */
  async goToRegistrationPage(): Promise<void> {
    logger.info("🖱️  Click 'Create a Negotiator account' button");
    await Promise.all([
      this.page.waitForURL('**/user/registration'),
      this.createAccountButton().click(),
    ]);
  }
}