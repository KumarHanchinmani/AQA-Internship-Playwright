import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';
import { RegistrationPage } from '../pages/registrationPage.spec';

test.describe('Login Page', () => { 


    test('Verify the sign in link is visible', async ({ page }) => {
        await page.goto('https://qa-course-01.andersenlab.com/login');
    
        const loginPage = new LoginPage(page);
        const regPage = new RegistrationPage (page);

        await loginPage.registerButton();
        await expect(regPage.signInLink).toBeVisible();
    
      });

    test('successfull register with valid data', async({ page }) => {

        await page.goto('https://qa-course-01.andersenlab.com/login');
    
        const loginPage = new LoginPage(page);
        const regPage = new RegistrationPage (page);

        await loginPage.registerButton();
        const userData = {
            firstName: 'Kumar',
            lastName: 'Dew',
            birthDate: {
              day: 15,
              month: 'April',
              year: '1998'
            },
            email: 'abtest234@gmail.com',
            password: 'qwerty@123',
            confirmPassword: 'qwerty@123'
          };

          await regPage.register(userData);
          await expect(page).toHaveURL('https://qa-course-01.andersenlab.com/login');


        
      



    });















});