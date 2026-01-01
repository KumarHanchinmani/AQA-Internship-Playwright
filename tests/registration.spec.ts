import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';
import { RegistrationPage } from '../pages/registrationPage.spec';
import { createValidRegistrationData } from '../test-data/registrationData';
import { Links } from '../enums/links.enums';
import { generateString } from '../utils/stringUtils';

test.describe('Registration page', () => {
  let loginPage: LoginPage;
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    regPage = new RegistrationPage(page);

    await loginPage.open();
    await loginPage.clickRegister();
  });

  test('[AQAPRACT-507] Availability of Sign In link on Registration page', async () => {
    await expect(regPage.signInLink).toBeVisible();
  });

  test('[AQAPRACT-508] Successful registration with valid data', async ({
    page,
  }) => {
    const userData = createValidRegistrationData();
    await regPage.register(userData);
    await expect(page).toHaveURL(Links.LOGIN);
  });

  test.describe('First name validation', () => {
    test('[AQAPRACT-509] Register with max First name length (255 characters)', async ({
      page,
    }) => {
      const userData = createValidRegistrationData({
        firstName: generateString(255),
      });
      await regPage.fillForm(userData);
      await regPage.submit();
      await expect(page).toHaveURL(Links.LOGIN);
    });

    test('[AQAPRACT-510] Register with min First name length (1 character)', async ({
      page,
    }) => {
      const userData = createValidRegistrationData({
        firstName: 'K',
      });
      await regPage.fillForm(userData);
      await regPage.submit();
      await expect(page).toHaveURL(Links.LOGIN);
    });

    test('[AQAPRACT-511] Register with max+1 First name length (256 characters)', async ({
      page,
    }) => {
      const userData = createValidRegistrationData({
        firstName: generateString(256),
      });

      await regPage.fillForm(userData);
      await regPage.submit();
      await expect(page).toHaveURL(Links.REGISTER);
    });

    test('[AQAPRACT-512] Register with empty First name field', async ({
      page,
    }) => {
      const userData = createValidRegistrationData({
        firstName: '',
      });

      await regPage.fillForm(userData);
      await expect(regPage.submitButton).toBeDisabled();
    });

    test.describe('Last name validation', () => {
      test('[AQAPRACT-514] Register with max Last name length (255 characters)', async ({
        page,
      }) => {
        const userData = createValidRegistrationData({
          lastName: generateString(255),
        });
        await regPage.fillForm(userData);
        await regPage.submit();
        await expect(page).toHaveURL(Links.LOGIN);
      });

      test('[AQAPRACT-515] Register with min Last name length (1 character)', async ({
        page,
      }) => {
        const userData = createValidRegistrationData({
          lastName: 'T',
        });
        await regPage.fillForm(userData);
        await regPage.submit();
        await expect(page).toHaveURL(Links.LOGIN);
      });
    });

    test('[AQAPRACT-516] Register with max+1 Last name length (256 characters)', async ({
      page,
    }) => {
      const userData = createValidRegistrationData({
        lastName: generateString(256),
      });

      await regPage.fillForm(userData);
      await regPage.submit();
      await expect(page).toHaveURL(Links.REGISTER);
    });

    test('[AQAPRACT-517] Register with empty Last name field', async ({
      page,
    }) => {
      const userData = createValidRegistrationData({
        lastName: '',
      });

      await regPage.fillForm(userData);
      await expect(regPage.submitButton).toBeDisabled();
    });

    test.describe('Date of birth validation', () => {
      test('[AQAPRACT-519] Register with empty "Date of birth" field', async ({
        page,
      }) => {
        const userData = createValidRegistrationData({
          birthDate: undefined,
        });
        await regPage.fillForm(userData);
        await expect(regPage.submitButton).toBeDisabled();
      });

      test('[AQAPRACT-521]The date is filled in manually in the Date of birth field', async ({
        page,
      }) => {
        const userData = createValidRegistrationData({
          birthDate: undefined,
          manualDob: '05/05/1995',
        });
        await regPage.fillForm(userData);
        await regPage.submit();
        await expect(page).toHaveURL(Links.LOGIN);
      });

      test('[AQAPRACT-522] It is impossible to register with a future Date of Birth', async () => {
        const userData = createValidRegistrationData({
          birthDate: {
            day: 5,
            month: 'April',
            year: '2045',
          },
        });

        await regPage.fillForm(userData);

        await expect(regPage.submitButton).toBeDisabled();
      });
    });
  });
});
