import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.page';
import { RegistrationPage } from '../pages/registrationPage.page';

test.describe('Login Page', () => {
  let loginPage: LoginPage;
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    regPage = new RegistrationPage(page);
    await loginPage.open();
  });
});
