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

test.describe('SignIn Password Validation', () => {
  test('[AQAPRACT-540] Validation of empty "Password" field on sign in page', async ({
    loginPage,
  }) => {
    await loginPage.enterEmail('cmaaa@gmal.com');
    await loginPage.enterPassword('');
    await expect(loginPage.signInButton).toBeDisabled();
  });

  test('[AQAPRACT-541] Validation of "Password" on min length (8 characters)', async ({
    loginPage,
  }) => {
    await loginPage.enterEmail('cmaaa@gmal.com');
    await loginPage.enterPassword('a'.repeat(8));
    await expect(loginPage.signInButton).toBeEnabled();
    await expect(loginPage.passwordRequiredErrorMessage).toBeHidden();
  });

  test('[AQAPRACT-542] Validation of Password on max length (20 characters)', async ({
    loginPage,
  }) => {
    await loginPage.enterEmail('cmaaa@gmal.com');
    await loginPage.enterPassword('a'.repeat(20));
    await expect(loginPage.signInButton).toBeEnabled();
    await expect(loginPage.passwordRequiredErrorMessage).toBeHidden();
  });

  test.only('[AQAPRACT-543] Validation of "Password" on 7 characters', async ({
    loginPage,
  }) => {
    await loginPage.enterEmail('cmaaa@gmal.com');
    await loginPage.enterPassword('a'.repeat(7));
    await expect(loginPage.minpasswordError).toBeVisible();
    await expect(loginPage.signInButton).toBeDisabled();
  });

  test('[AQAPRACT-544] Validation of "Password" on 21 characters', async ({
    loginPage,
  }) => {
    await loginPage.enterEmail('cmaaa@gmal.com');
    await loginPage.enterPassword('a'.repeat(21));
    await expect(loginPage.maxpasswordError).toBeVisible();
    await expect(loginPage.signInButton).toBeDisabled();
  });
});
