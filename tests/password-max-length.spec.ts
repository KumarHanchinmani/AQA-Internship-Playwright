import { test, expect } from '../fixtures/pages.fixture';

test.describe('SignIn Password Validation', () => {
  test('[AQAPRACT-544] Validation of "Password" on 21 characters', async ({
    loginPage,
  }) => {
    await loginPage.enterEmail('cmaaa@gmal.com');
    await loginPage.enterPassword('a'.repeat(21));
    await expect(loginPage.maxpasswordError).toBeVisible();
    await expect(loginPage.signInButton).toBeDisabled();
  });
});