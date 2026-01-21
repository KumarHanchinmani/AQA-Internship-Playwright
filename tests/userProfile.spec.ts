import { test, expect } from '../fixtures/pages.fixture';
import { validUser } from '../test-data/signInData';

test.describe('User profile Validation', () => {
  test('[AQAPRACT-545] "User profile" page layout', async ({
    loginPage,
    profilePage,
  }) => {
    await loginPage.login(validUser.email, validUser.password);
    await expect(profilePage.logoText).toBeVisible();
    await expect(profilePage.logoImage).toBeVisible();
    await expect(profilePage.fullName).toBeVisible();
    await expect(profilePage.dateOfBirth).toBeVisible();
    await expect(profilePage.editButton).toBeVisible();
    await expect(profilePage.email).toBeVisible();
    await expect(profilePage.position).toBeVisible();
    await expect(profilePage.technologies).toBeVisible();
    await expect(profilePage.userPhotoHeader).toBeVisible();
    await expect(profilePage.userPhoto).toBeVisible();
    await expect(profilePage.aqaDropdown).toBeVisible();
    await expect(profilePage.footerLogo).toBeVisible();
    await expect(profilePage.footerEmail).toBeVisible();
    await expect(profilePage.contactUs).toBeVisible();
    await expect(profilePage.signOutButton).toBeVisible();
    await expect(profilePage.phoneNumber).toBeVisible();
  });

  test('[AQAPRACT-546] Successful Sign Out', async ({
    loginPage,
    profilePage,
  }) => {
    await loginPage.login(validUser.email, validUser.password);
    await profilePage.clickSignOut();
    await expect(loginPage.signInHeading).toBeVisible();
  });

  test.only('[AQAPRACT-547] "AQA Practice" dropdown options validation', async ({
    loginPage,
    profilePage,
  }) => {
    await loginPage.login(validUser.email, validUser.password);
    await profilePage.hoverAqaDropdown();
    await expect(profilePage.dropdownSelect).toBeVisible();
    await expect(profilePage.dropdownDragDrop).toBeVisible();
    await expect(profilePage.dropdownActionsAlerts).toBeVisible();
  });
});
