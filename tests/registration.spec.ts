import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.page';
import { RegistrationPage } from '../pages/registrationPage.page';
import { createValidRegistrationData } from '../test-data/registrationData';
import { Links } from '../enums/links.enums';
import { generateString } from '../utils/stringUtils';
import { Calendar } from '../pages/calendar.page';

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
test.describe('Date of birth validation', () => {
  let loginPage: LoginPage;
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    regPage = new RegistrationPage(page);

    await loginPage.open();
    await loginPage.clickRegister();
  });

  test('[AQAPRACT-519] Register with empty "Date of birth" field', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      birthDate: undefined,
    });
    await regPage.fillForm(userData);
    await expect(regPage.submitButton).toBeDisabled();
  });

  test('[AQAPRACT-521] The date is filled in manually in the Date of birth field', async ({
    page,
  }) => {
    await regPage.fillForm({
      firstName: 'kum',
      lastName: 'gdfgg',
      email: `user_${Date.now()}@test.com`,
      password: '1q2w3e4r5t',
      confirmPassword: '1q2w3e4r5t',
    });

    await regPage.fillDateDirectly('11/10/1995');
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
test.describe('Email validation', () => {
  let loginPage: LoginPage;
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    regPage = new RegistrationPage(page);

    await loginPage.open();
    await loginPage.clickRegister();
  });
  test('[AQAPRACT-523] Register with Empty email field', async ({ page }) => {
    const userData = createValidRegistrationData({
      email: '',
    });
    await regPage.fillForm(userData);
    await expect(regPage.submitButton).toBeDisabled();
  });

  test('[AQAPRACT-524] Register with invalid format email field', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      email: 'Abc',
    });
    await regPage.fillForm(userData);
    await expect(regPage.submitButton).toBeDisabled();
    await regPage.expectEmailValidationError(/invalid email/i);
  });

  test('[AQAPRACT-525] Register with already existing email', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      email: 'aaabbb@gmal.com',
    });

    await regPage.fillForm(userData);
    await regPage.submit();
    await expect(page).toHaveURL(Links.REGISTER);
  });
});

test.describe('Password validation', () => {
  let loginPage: LoginPage;
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    regPage = new RegistrationPage(page);

    await loginPage.open();
    await loginPage.clickRegister();
  });

  test('[AQAPRACT-526] Register with min Password length (8 characters)', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      password: '1q2w3e4r',
      confirmPassword: '1q2w3e4r',
    });
    await regPage.fillForm(userData);
    await regPage.submit();
    await expect(page).toHaveURL(Links.LOGIN);
  });
  test('[AQAPRACT-527] Register with max "Password" length (20 characters)', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      password: '1q2w3e4r5t6y7u8i9o0p',
      confirmPassword: '1q2w3e4r5t6y7u8i9o0p',
    });
    await regPage.fillForm(userData);
    await regPage.submit();
    await expect(page).toHaveURL(Links.LOGIN);
  });

  test('[AQAPRACT-528] Register with min-1 "Password" length (7 characters)', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      password: '1q2w3e4',
      confirmPassword: '1q2w3e4',
    });
    await regPage.fillForm(userData);
    await expect(regPage.minpasswordError).toBeVisible();
    await expect(regPage.submitButton).toBeDisabled();
  });

  test('[AQAPRACT-529] Register with max+1 Password length (21 characters)', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      password: '1q2w3e4r5t6y7u8i9o0p1',
      confirmPassword: '1q2w3e4r5t6y7u8i9o0p1',
    });
    await regPage.fillForm(userData);
    await expect(regPage.maxpasswordError).toBeVisible();
    await expect(regPage.submitButton).toBeDisabled();
  });

  test('[AQAPRACT-530] Register with empty Password field', async ({
    page,
  }) => {
    const userData = createValidRegistrationData({
      password: '',
      confirmPassword: '',
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

  test('[AQAPRACT-531] Register with equal data Password and Confirm password fields', async ({
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

test.describe('Calendar  validation', () => {
  let loginPage: LoginPage;
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    regPage = new RegistrationPage(page);

    await loginPage.open();
    await loginPage.clickRegister();
  });
  test('[AQAPRACT-745] Month navigators switch months', async ({ page }) => {
    await regPage.openDOBCalendar();
    const initialMonth = await regPage.calendar.getCurrentMonth();
    await regPage.calendar.previousMonthDOB();
    const previousMonth = await regPage.calendar.getCurrentMonth();
    expect(previousMonth).not.toBe(initialMonth);

    await regPage.calendar.nextMonthDOB();
    const finalMonth = await regPage.calendar.getCurrentMonth();
    expect(finalMonth).toBe(initialMonth);
  });

  test('[AQAPRACT-746] Year drop down is possible to be opened', async ({
    page,
  }) => {
    await regPage.openDOBCalendar();
    await expect(regPage.calendar.yearDropdown).toBeEnabled();
  });

  test('[AQAPRACT-747] The year is possible to be selected in the drop down', async ({
    page,
  }) => {
    await regPage.openDOBCalendar();
    await regPage.calendar.selectYear('1950');
    await expect(regPage.calendar.yearDropdown).toHaveValue('1950');
  });

  test('[AQAPRACT-748] Month drop down is possible to be opened', async ({
    page,
  }) => {
    await regPage.openDOBCalendar();
    await expect(regPage.calendar.monthDropdown).toBeEnabled();
  });

  test('[AQAPRACT-749] The month is possible to be selected in the drop down', async ({
    page,
  }) => {
    await regPage.openDOBCalendar();
    await regPage.calendar.selectMonth('May');
    await expect(regPage.calendar.monthDropdown).toHaveValue('May');
  });

  test('[AQAPRACT-750]The date is possible to be selected', async ({
    page,
  }) => {
    await regPage.openDOBCalendar();
    await regPage.calendar.selectDate({
      year: '1995',
      month: 'May',
      day: 15,
    });

    await expect(regPage.dateOfBirth).toHaveValue('05/15/1995');
  });
});
