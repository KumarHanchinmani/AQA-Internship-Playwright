import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.page';
import { RegistrationPage } from '../pages/registrationPage.page';
import { ProfilePage } from '../pages/profile.page';
import { EditProfilePage } from '../pages/editProfile.page';

type PagesFixtures = {
  loginPage: LoginPage;
  regPage: RegistrationPage;
  profilePage: ProfilePage;
  editProfilePage: EditProfilePage;
};

export const test = base.extend<PagesFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },
  regPage: async ({ page, loginPage }, use) => {
    const regPage = new RegistrationPage(page);
    await loginPage.clickRegister();
    await use(regPage);
  },
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
  editProfilePage: async ({ page }, use) => {
    const editProfilePage = new EditProfilePage(page);
    await use(editProfilePage);
  },
});

export { expect } from '@playwright/test';
