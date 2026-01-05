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
});

test.describe('First name validation', () => {
  let loginPage: LoginPage;
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    regPage = new RegistrationPage(page);

    await loginPage.open();
    await loginPage.clickRegister();
  });

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
});

test.describe('Last name validation', () => {
  let loginPage: LoginPage;
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    regPage = new RegistrationPage(page);

    await loginPage.open();
    await loginPage.clickRegister();
  });

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
});

test.describe('Confirm password  validation', () => {
  let loginPage: LoginPage;
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    regPage = new RegistrationPage(page);

    await loginPage.open();
    await loginPage.clickRegister();
  });

  test('[AQAPRACT-531]Register with equal data Password and Confirm password fields', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      password: '1q2w3e4r5t',
      confirmPassword: '1q2w3e4r5t',
    });
    await regPage.fillForm(userData);
    await regPage.submit();
    await expect(page).toHaveURL(Links.LOGIN);
  });

  test('[AQAPRACT-532] Register with different data Password and Confirm password fields', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      password: '1q2w3e4r5t',
      confirmPassword: '1q2w3e5r4r',
    });
    await regPage.fillForm(userData);
    await expect(regPage.submitButton).toBeDisabled();
  });

  test('[AQAPRACT-533] Register with empty Confirm password fields', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      password: '1q2w3e4r5t6y',
      confirmPassword: '',
    });
    await regPage.fillForm(userData);
    await expect(regPage.submitButton).toBeDisabled();
  });
});
