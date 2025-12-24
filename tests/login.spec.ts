import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';

test.describe('Login Page', () => {

  test('Verify the registration link is visible', async ({ page }) => {
    await page.goto('https://qa-course-01.andersenlab.com/login');

    const loginPage = new LoginPage(page);
    await expect(loginPage.registrationLink).toBeVisible();


  });

});

