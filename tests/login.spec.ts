import { test, expect } from '../fixtures/pages.fixture';
import { LoginPage } from '../pages/loginPage.page';
import { RegistrationPage } from '../pages/registrationPage.page';

test.describe('SignIn Email Validation', () => {
  test('[AQAPRACT-539] Validation of empty "Email" field on "Sign in" page', async ({
    loginPage,
  }) => {
    await loginPage.enterEmail('');
    await loginPage.enterPassword('1q2w3e4e1q');
    await expect(loginPage.signInButton).toBeDisabled();
    await expect(loginPage.emailRequiredErrorMessage).toBeVisible();
  });
});
