import { test } from '../fixtures/pom';
import { AccountProfilePage } from '../pages/account-profile-page';
import { generateRandomUser } from '../utils/helpers';
import { config } from '../configs/config';
import { logger } from '../utils/logger';
import * as path from 'path';

// Test suite for registration functionality.
test.describe('Registration Tests', () => {
  // Test case for successful registration and account activation.
  test('Successful registration and activation', async ({ page, context, loginPage, registrationPage, mailcatcherPage, accountProfilePage }) => {
    const user = generateRandomUser();

    logger.info('Starting registration test');

    // Step 1: Navigate to the registration page.
    await test.step('Navigate to registration page', async () => {
      await loginPage.navigate(config.baseURL);
      await loginPage.goToRegistrationPage();
    });

    // Step 2: Register a new user.
    await test.step('Register new user', async () => {
      await registrationPage.registerUser(user);
    });

    // Step 3: Verify the email confirmation message.
    await test.step('Verify email confirmation message', async () => {
      await registrationPage.verifyEmailConfirmationMessage();
    });

    // Step 4: Complete the registration via Mailcatcher and activate the account.
    await test.step('Complete registration via Mailcatcher', async () => {
      const newPagePromise = context.waitForEvent('page');
      await mailcatcherPage.findAndCompleteRegistration(user.username);
      const newPage = await newPagePromise;
      await newPage.waitForLoadState();

      const accountProfilePageNew = new AccountProfilePage(newPage);
      await accountProfilePageNew.verifyAccountActivation();
    });


    logger.info('Registration test passed');
  });
});
