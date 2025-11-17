import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { Users } from '../data/Users';
import { config } from '../configs/config';
import { logger } from '../utils/logger';
import { SimHeaderPanel } from '../panels/sim-header-panel';
import { BasePage } from '../pages/base-page';

// Test suite for login functionality.
test.describe.parallel('Login Tests', () => {
    // Before each test, navigate to the login page.
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate(config.baseURL);
    });

    // After each test, close the page.
    test.afterEach(async ({ page }) => {
      await page.close();
    });

    // Test case for successful login with a standard user.
    test('Successful login as standard user', async ({ page }) => {
        const loginPage = new LoginPage(page);
      
        logger.info('ℹ️  Starting login test');
        await loginPage.login(Users.StandardUser);

        const simHeaderPanel = new SimHeaderPanel(page);
        await simHeaderPanel.VerifyUserNameRole();
      
        await simHeaderPanel.verifyOnClassesPage();

        logger.info('ℹ️  Login test passed');
    });

    // Test case for successful login with extended logging.
    test('Successful login as standard user (extended logging enabled)', async ({ page }) => {
        
        await test.step('Start login test', async () => {
            logger.info('ℹ️  Starting login test');
        });

        await test.step('Navigate and perform login', async () => {
            const loginPage = new LoginPage(page);
            await loginPage.login(Users.StandardUser);
        });

        await test.step('Verify user name and role visibility', async () => {
            const simHeaderPanel = new SimHeaderPanel(page);
            await simHeaderPanel.VerifyUserNameRole();
        });

        await test.step('Check pages after login', async () => {
            const simHeaderPanel = new SimHeaderPanel(page);
            await simHeaderPanel.verifyOnClassesPage();
        });

        await test.step('Finish login test', async () => {
            logger.info('ℹ️  Login test passed');
        });
    });
});
