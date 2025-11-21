import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { RegistrationPage } from '../pages/registration-page';
import { MailcatcherPage } from '../pages/mailcatcher-page';
import { AccountProfilePage } from '../pages/account-profile-page';
import { SimHeaderPanel } from '../panels/sim-header-panel';

type Pages = {
    loginPage: LoginPage;
    registrationPage: RegistrationPage;
    mailcatcherPage: MailcatcherPage;
    accountProfilePage: AccountProfilePage;
    simHeaderPanel: SimHeaderPanel;
};

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    },
    mailcatcherPage: async ({ page }, use) => {
        await use(new MailcatcherPage(page));
    },
    accountProfilePage: async ({ page }, use) => {
        await use(new AccountProfilePage(page));
    },
    simHeaderPanel: async ({ page }, use) => {
        await use(new SimHeaderPanel(page));
    },
});

export { expect } from '@playwright/test';
