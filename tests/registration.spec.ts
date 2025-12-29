import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';
import { RegistrationPage } from '../pages/registrationPage.spec';
import { createValidRegistrationData } from '../test-data/registrationData';
import { Links } from '../enums/links.enums';

test.describe('Registration page', () => {
  let loginPage: LoginPage;
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    regPage = new RegistrationPage(page);

    await loginPage.open();
    await loginPage.clickRegister();
  });


  test('[AQAPRACT-507] Availability of link Regisration on Sign in page ]' , async ({
    page,
  }) => {
    await expect(loginPage.registrationButton).toBeVisible();
    await loginPage.registrationButton.click() ;
    await expect(regPage.signInLink).toBeVisible;

  });

  test('[AQAPRACT-508] Successfull registration with valid data', async ({
    page,
  }) => {
    const userData = createValidRegistrationData();
    await regPage.register(userData);
    await expect(page).toHaveURL(Links.LOGIN);
  });

  



  });

