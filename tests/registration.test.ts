import { test} from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { RegistrationPage } from '../pages/registration-page';
import { MailcatcherPage } from '../pages/mailcatcher-page';
import { AccountProfilePage } from '../pages/account-profile-page';
import { generateRandomUser } from '../utils/helpers';
import { config } from '../configs/config';
import { logger } from '../utils/logger';
import * as path from 'path';

// Test suite for registration functionality.
test.describe('Registration Tests', () => {
  // Test case for successful registration and account activation.
  test('Successful registration and activation', async ({ page, context }) => {
    const user = generateRandomUser();
    
    logger.info('Starting registration test');

    // Step 1: Navigate to the registration page.
    await test.step('Navigate to registration page', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate(config.baseURL);
      await loginPage.goToRegistrationPage();
    });

    // Step 2: Register a new user.
    await test.step('Register new user', async () => {
      const registrationPage = new RegistrationPage(page);
      await registrationPage.registerUser(user);
    });

    // Step 3: Verify the email confirmation message.
    await test.step('Verify email confirmation message', async () => {
      const registrationPage = new RegistrationPage(page);
      await registrationPage.verifyEmailConfirmationMessage();
    });

    // Step 4: Complete the registration via Mailcatcher and activate the account.
    await test.step('Complete registration via Mailcatcher', async () => {
      const mailcatcherPageInstance = new MailcatcherPage(page);
      
      const newPagePromise = context.waitForEvent('page');
      await mailcatcherPageInstance.findAndCompleteRegistration(user.username);
      const newPage = await newPagePromise;
      await newPage.waitForLoadState();

      const accountProfilePage = new AccountProfilePage(newPage);
      await accountProfilePage.verifyAccountActivation();
      
    });
    
    logger.info('Registration test passed');
  });
});
