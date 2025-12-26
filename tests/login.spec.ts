import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('[TC_REGISTER_001] Verify Registration  link is available', async ({
    page,
  }) => {
    await expect(loginPage.registrationButton).toBeVisible();
  });
});
