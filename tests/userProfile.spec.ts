import { test, expect } from '../fixtures/pages.fixture';
import { ProfilePage } from '../pages/profile.page';
import { validUser, validUser2 } from '../test-data/signInData';
import { profileUser } from '../test-data/userData';

test.describe('User profile Validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(validUser.email, validUser.password);
  });

  test('[AQAPRACT-545] "User profile" page layout', async ({ profilePage }) => {
    await expect(profilePage.logoText).toBeVisible();
    await expect(profilePage.logoImage).toBeVisible();
    await expect(profilePage.fullName).toBeVisible();
    await expect(profilePage.dateOfBirth).toBeVisible();
    await expect(profilePage.editButton).toBeVisible();
    await expect(profilePage.emailLabel).toBeVisible();
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
    await profilePage.clickSignOut();
    await expect(loginPage.signInHeading).toBeVisible();
  });

  test('[AQAPRACT-547] "AQA Practice" dropdown options validation', async ({
    profilePage,
  }) => {
    await profilePage.hoverAqaDropdown();
    await expect(profilePage.dropdownSelect).toBeVisible();
    await expect(profilePage.dropdownDragDrop).toBeVisible();
    await expect(profilePage.dropdownActionsAlerts).toBeVisible();
  });
});

test.describe('Edit personal information', () => {
  test.beforeEach(async ({ loginPage, profilePage }) => {
    await loginPage.login(validUser2.email, validUser2.password);
    await profilePage.clickEditButton();
  });

  test('[AQAPRACT-548] "Edit personal information" flyout available', async ({
    editProfilePage,
  }) => {
    await expect(editProfilePage.title).toBeVisible();
    await expect(editProfilePage.subTitle).toBeVisible();
    await expect(editProfilePage.closeButton).toBeVisible();
    await expect(editProfilePage.firstNameInput).toBeVisible();
    await expect(editProfilePage.lastNameInput).toBeVisible();
    await expect(editProfilePage.emailInput).toBeVisible();
    await expect(editProfilePage.dobLabel).toBeVisible();
    await expect(editProfilePage.cancelButton).toBeVisible();
    await expect(editProfilePage.saveButton).toBeVisible();
    await expect(editProfilePage.firstNameInput).toHaveValue(
      profileUser.firstName
    );
    await expect(editProfilePage.lastNameInput).toHaveValue(
      profileUser.lastName
    );
    await expect(editProfilePage.emailInput).toHaveValue(profileUser.email);
    await expect(editProfilePage.dobInput).toHaveValue(profileUser.dob);
  });

  test('[AQAPRACT-549] Edit First name on User profile flyout', async ({
    editProfilePage,
    profilePage,
  }) => {
    await editProfilePage.updateFirstName('Ball');
    await editProfilePage.submit();
    await expect(profilePage.fullName).toContainText('Ball');
  });

  test('[AQAPRACT-550] Edit Last name on User profile flyout', async ({
    editProfilePage,
    profilePage,
  }) => {
    await editProfilePage.updateLastName('god');
    await editProfilePage.submit();
    await expect(profilePage.fullName).toContainText('god');
  });

  test('[AQAPRACT-551] Edit Email on User profile flyout', async ({
    editProfilePage,
    profilePage,
  }) => {
    await editProfilePage.updateEmail('aabb@gmal.com');
    await editProfilePage.submit();
    await expect(profilePage.emailValue).toHaveText('aabb@gmal.com');
  });

  test('[AQAPRACT-552] Edit Date of Birth on User profile flyout', async ({
    editProfilePage,
    profilePage,
  }) => {
    await editProfilePage.updateDOB('10/10/1990');
    await editProfilePage.submit();
    await expect(profilePage.dateOfBirthValue).toHaveText('10/10/1990');
  });

  test('[AQAPRACT-553] Cancel editing the data on the flyout (after the data is edited)', async ({
    editProfilePage,
    profilePage,
  }) => {
    const originalFirstName = await profilePage.fullName.innerText();
    await editProfilePage.updateFirstName('aabbcc');
    await editProfilePage.cancel();
    await expect(profilePage.fullName).toBeVisible();
    await expect(profilePage.fullName).toHaveText(originalFirstName);
  });

  test('[AQAPRACT-554] Cancel editing the data on the flyout (without editing)', async ({
    editProfilePage,
    profilePage,
  }) => {
    await editProfilePage.cancel();
    await expect(editProfilePage.title).not.toBeVisible();
    await expect(profilePage.fullName).toBeVisible();
    await expect(profilePage.emailValue).toBeVisible();
    await expect(profilePage.dateOfBirthValue).toBeVisible();
  });

  test('[AQAPRACT-555] Close "Edit personal information" flyout by "X" button', async ({
    editProfilePage,
    profilePage,
  }) => {
    const originalFirstName = await profilePage.fullName.innerText();
    await editProfilePage.updateFirstName('aabbcc');
    await editProfilePage.close();
    await expect(profilePage.fullName).toBeVisible();
    await expect(profilePage.fullName).toHaveText(originalFirstName);
  });
});

test.describe('Edit profile first Name validation', () => {
  test.beforeEach(async ({ loginPage, profilePage }) => {
    await loginPage.login(validUser2.email, validUser2.password);
    await profilePage.clickEditButton();
  });
  test('[AQAPRACT-556] Leave "First name" field empty on "Edit personal information" flyout', async ({
    editProfilePage,
    profilePage,
  }) => {
    await editProfilePage.clearFirstName();
    await expect(editProfilePage.firstNameRequiredError).toBeVisible();
    await expect(editProfilePage.saveButton).toBeDisabled();
  });

  test('[AQAPRACT-557] Edit the "First name" with 1 character length', async ({
    editProfilePage,
    profilePage,
  }) => {
    await editProfilePage.updateFirstName('a'.repeat(1));
    await editProfilePage.submit();
    await expect(profilePage.logoText).toBeVisible();
    await expect(profilePage.fullName).toContainText('a');
  });

  test('[AQAPRACT-558] Edit the "First name" with 255 character length', async ({
    editProfilePage,
    profilePage,
  }) => {
    await editProfilePage.clearFirstName();
    await editProfilePage.updateFirstName('a'.repeat(255));
    await editProfilePage.submit();
    await expect(profilePage.logoText).toBeVisible();
    await expect(profilePage.fullName).toContainText('a'.repeat(255));
  });

  test('[AQAPRACT-559] Edit the "First name" with 256 character length', async ({
    editProfilePage,
    profilePage,
  }) => {
    await editProfilePage.clearFirstName();
    await editProfilePage.updateFirstName('a'.repeat(256));
    await expect(editProfilePage.saveButton).toBeVisible();
    await editProfilePage.submit();
    await expect(editProfilePage.firstNameRequiredError).toBeVisible();
  });

  test('[AQAPRACT-560] Edit the "First name" field with spaces', async ({
    editProfilePage,
    profilePage,
  }) => {
    const firstNameWithSpaces = '     ';
    await editProfilePage.clearFirstName();
    await editProfilePage.updateFirstName(firstNameWithSpaces);
    await expect(editProfilePage.saveButton).toBeVisible();
    await editProfilePage.submit();
    await expect(editProfilePage.firstNameRequiredError).toBeVisible();
  });
});
