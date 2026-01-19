import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.page';
import { RegistrationPage } from '../pages/registrationPage.page';

type PagesFixtures = {
  loginPage: LoginPage;
  regPage: RegistrationPage;
};

export const test = base.extend<PagesFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },

  regPage: async ({ loginPage }, use) => {
    const regPage = new RegistrationPage(loginPage.getPage());
    await loginPage.clickRegister();
    await use(regPage);
  },
});

export { expect } from '@playwright/test';
