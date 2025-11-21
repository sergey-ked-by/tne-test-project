import { Page, expect } from '@playwright/test';

import { User } from '../models/User';
import { logger } from '../utils/logger';
import * as path from 'path';
import { config } from '../configs/config';

/**
 * Represents the registration page and its functionalities.
 */
export class RegistrationPage {
  constructor(public page: Page) { }

  // Locators
  private avatarPencilIcon = () => this.page.locator('span[data-automation="pencil-span-layout-login"]');
  private avatarUploadButtonInModal = () => this.page.getByText('Choose Avatar', { exact: true });
  private firstAvatarOption = () => this.page.locator('img[src="/files/user_avatars/default_male_0.svg"]');
  private submitAvatarButton = () => this.page.getByText('Submit', { exact: true });
  private firstNameInput = () => this.page.locator('input[placeholder="Enter First Name"]');
  private lastNameInput = () => this.page.locator('input[placeholder="Enter Last Name"]');
  private countryDropdownInput = () => this.page.locator('sim-select-input[data-automation="country-of-residence-input-layout-login"] input.writable');
  private countryOption = (countryName: string) => this.page.getByText(countryName, { exact: true });
  private emailInput = () => this.page.locator('input[placeholder="Enter Email"]');
  private passwordInput = () => this.page.locator('input[placeholder="Enter Password"]');
  private saveButton = () => this.page.locator('input[data-automation="save-button-layout-login"]');

  /**
   * Registers a new user with the provided details.
   * @param user The user object containing registration details.
   */
  async registerUser(user: User): Promise<void> {
    logger.info(`Specify first name: ${user.firstName}`);
    await this.firstNameInput().fill(user.firstName!);
    logger.info(`Specify last name: ${user.lastName}`);
    await this.lastNameInput().fill(user.lastName!);
    await this.selectCountry();
    logger.info(`Specify email: ${user.username}`);
    await this.emailInput().fill(user.username);
    logger.info("Specify password: *****");
    await this.passwordInput().focus();
    await this.passwordInput().fill(user.password);

    logger.info("Clicking avatar edit icon");
    await this.avatarPencilIcon().click();
    logger.info("Waiting for avatar selection modal to appear");
    await this.avatarUploadButtonInModal().waitFor({ state: 'visible' });
    logger.info("Clicking 'Choose Avatar' button in avatar modal");
    await this.avatarUploadButtonInModal().click();

    logger.info("Selecting the first avatar");
    await this.firstAvatarOption().click();
    logger.info("Clicking 'Submit' button in avatar grid modal");
    await this.submitAvatarButton().click();

    logger.info("Click save button");
    await this.saveButton().click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Selects a country from the dropdown.
   * @param countryName The name of the country to select. Defaults to 'Albania'.
   */
  async selectCountry(countryName: string = config.defaultCountry): Promise<void> {
    logger.info("Clicking country dropdown");
    await this.countryDropdownInput().click();
    logger.info(`Selecting country: ${countryName}`);
    const option = this.countryOption(countryName);
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  /**
   * Verifies that the email confirmation message is displayed after registration.
   */
  async verifyEmailConfirmationMessage(): Promise<void> {
    logger.info('Verify email confirmation popover is visible');
    const popoverContainer = this.page.locator('sim-confirm-email-popover');
    const popoverTitle = popoverContainer.locator("h3");
    const popoverBody = popoverContainer.locator("p:has-text('A confirmation email has been sent to')");
    await expect(popoverTitle).toHaveText("Welcome to the world’s most advanced negotiation sim");
    await expect(popoverBody).toBeVisible();
    logger.info("Email confirmation popover and text are visible");
  }
}
