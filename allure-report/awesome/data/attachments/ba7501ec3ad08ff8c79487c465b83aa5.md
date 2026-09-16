# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: userProfile.spec.ts >> Edit personal information >> [AQAPRACT-548] "Edit personal information" flyout available
- Location: tests\userProfile.spec.ts:54:8

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByLabel('First Name')
Expected: "sanchar"
Received: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for getByLabel('First Name')
    14 × locator resolved to <input type="text" name="firstName" placeholder="First Name" class="border-gray-500 border-b outline-none h-9 text-sm" value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"/>
       - unexpected value "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

```

```yaml
- textbox "First name":
  - /placeholder: First Name
  - text: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

# Test source

```ts
  1   | import { test, expect } from '../fixtures/pages.fixture';
  2   | import { ProfilePage } from '../pages/profile.page';
  3   | import { validUser, validUser2 } from '../test-data/signInData';
  4   | import { profileUser } from '../test-data/userData';
  5   | 
  6   | test.describe('User profile Validation', () => {
  7   |   test.beforeEach(async ({ loginPage }) => {
  8   |     await loginPage.login(validUser.email, validUser.password);
  9   |   });
  10  | 
  11  |   test('[AQAPRACT-545] "User profile" page layout', async ({ profilePage }) => {
  12  |     await expect(profilePage.logoText).toBeVisible();
  13  |     await expect(profilePage.logoImage).toBeVisible();
  14  |     await expect(profilePage.fullName).toBeVisible();
  15  |     await expect(profilePage.dateOfBirth).toBeVisible();
  16  |     await expect(profilePage.editButton).toBeVisible();
  17  |     await expect(profilePage.emailLabel).toBeVisible();
  18  |     await expect(profilePage.position).toBeVisible();
  19  |     await expect(profilePage.technologies).toBeVisible();
  20  |     await expect(profilePage.userPhotoHeader).toBeVisible();
  21  |     await expect(profilePage.userPhoto).toBeVisible();
  22  |     await expect(profilePage.aqaDropdown).toBeVisible();
  23  |     await expect(profilePage.footerLogo).toBeVisible();
  24  |     await expect(profilePage.footerEmail).toBeVisible();
  25  |     await expect(profilePage.contactUs).toBeVisible();
  26  |     await expect(profilePage.signOutButton).toBeVisible();
  27  |     await expect(profilePage.phoneNumber).toBeVisible();
  28  |   });
  29  | 
  30  |   test('[AQAPRACT-546] Successful Sign Out', async ({
  31  |     loginPage,
  32  |     profilePage,
  33  |   }) => {
  34  |     await profilePage.clickSignOut();
  35  |     await expect(loginPage.signInHeading).toBeVisible();
  36  |   });
  37  | 
  38  |   test('[AQAPRACT-547] "AQA Practice" dropdown options validation', async ({
  39  |     profilePage,
  40  |   }) => {
  41  |     await profilePage.hoverAqaDropdown();
  42  |     await expect(profilePage.dropdownSelect).toBeVisible();
  43  |     await expect(profilePage.dropdownDragDrop).toBeVisible();
  44  |     await expect(profilePage.dropdownActionsAlerts).toBeVisible();
  45  |   });
  46  | });
  47  | 
  48  | test.describe('Edit personal information', () => {
  49  |   test.beforeEach(async ({ loginPage, profilePage }) => {
  50  |     await loginPage.login(validUser2.email, validUser2.password);
  51  |     await profilePage.clickEditButton();
  52  |   });
  53  | 
  54  |   test.only('[AQAPRACT-548] "Edit personal information" flyout available', async ({
  55  |     editProfilePage,
  56  |   }) => {
  57  |     await expect(editProfilePage.title).toBeVisible();
  58  |     await expect(editProfilePage.subTitle).toBeVisible();
  59  |     await expect(editProfilePage.closeButton).toBeVisible();
  60  |     await expect(editProfilePage.firstNameInput).toBeVisible();
  61  |     await expect(editProfilePage.lastNameInput).toBeVisible();
  62  |     await expect(editProfilePage.emailInput).toBeVisible();
  63  |     await expect(editProfilePage.dobLabel).toBeVisible();
  64  |     await expect(editProfilePage.cancelButton).toBeVisible();
  65  |     await expect(editProfilePage.saveButton).toBeVisible();
> 66  |     await expect(editProfilePage.firstNameInput).toHaveValue(
      |                                                  ^ Error: expect(locator).toHaveValue(expected) failed
  67  |       profileUser.firstName
  68  |     );
  69  |     await expect(editProfilePage.lastNameInput).toHaveValue(
  70  |       profileUser.lastName
  71  |     );
  72  |     await expect(editProfilePage.emailInput).toHaveValue(profileUser.email);
  73  |     await expect(editProfilePage.dobInput).toHaveValue(profileUser.dob);
  74  |   });
  75  | 
  76  |   test('[AQAPRACT-549] Edit First name on User profile flyout', async ({
  77  |     editProfilePage,
  78  |     profilePage,
  79  |   }) => {
  80  |     await editProfilePage.updateFirstName('Ball');
  81  |     await editProfilePage.submit();
  82  |     await expect(profilePage.fullName).toContainText('Ball');
  83  |   });
  84  | 
  85  |   test('[AQAPRACT-550] Edit Last name on User profile flyout', async ({
  86  |     editProfilePage,
  87  |     profilePage,
  88  |   }) => {
  89  |     await editProfilePage.updateLastName('god');
  90  |     await editProfilePage.submit();
  91  |     await expect(profilePage.fullName).toContainText('god');
  92  |   });
  93  | 
  94  |   test('[AQAPRACT-551] Edit Email on User profile flyout', async ({
  95  |     editProfilePage,
  96  |     profilePage,
  97  |   }) => {
  98  |     await editProfilePage.updateEmail('aabb@gmal.com');
  99  |     await editProfilePage.submit();
  100 |     await expect(profilePage.emailValue).toHaveText('aabb@gmal.com');
  101 |   });
  102 | 
  103 |   test('[AQAPRACT-552] Edit Date of Birth on User profile flyout', async ({
  104 |     editProfilePage,
  105 |     profilePage,
  106 |   }) => {
  107 |     await editProfilePage.updateDOB('10/10/1990');
  108 |     await editProfilePage.submit();
  109 |     await expect(profilePage.dateOfBirthValue).toHaveText('10/10/1990');
  110 |   });
  111 | 
  112 |   test('[AQAPRACT-553] Cancel editing the data on the flyout (after the data is edited)', async ({
  113 |     editProfilePage,
  114 |     profilePage,
  115 |   }) => {
  116 |     const originalFirstName = await profilePage.fullName.innerText();
  117 |     await editProfilePage.updateFirstName('aabbcc');
  118 |     await editProfilePage.cancel();
  119 |     await expect(profilePage.fullName).toBeVisible();
  120 |     await expect(profilePage.fullName).toHaveText(originalFirstName);
  121 |   });
  122 | 
  123 |   test('[AQAPRACT-554] Cancel editing the data on the flyout (without editing)', async ({
  124 |     editProfilePage,
  125 |     profilePage,
  126 |   }) => {
  127 |     await editProfilePage.cancel();
  128 |     await expect(editProfilePage.title).not.toBeVisible();
  129 |     await expect(profilePage.fullName).toBeVisible();
  130 |     await expect(profilePage.emailValue).toBeVisible();
  131 |     await expect(profilePage.dateOfBirthValue).toBeVisible();
  132 |   });
  133 | 
  134 |   test('[AQAPRACT-555] Close "Edit personal information" flyout by "X" button', async ({
  135 |     editProfilePage,
  136 |     profilePage,
  137 |   }) => {
  138 |     const originalFirstName = await profilePage.fullName.innerText();
  139 |     await editProfilePage.updateFirstName('aabbcc');
  140 |     await editProfilePage.close();
  141 |     await expect(profilePage.fullName).toBeVisible();
  142 |     await expect(profilePage.fullName).toHaveText(originalFirstName);
  143 |   });
  144 | });
  145 | 
  146 | test.describe('Edit profile first Name validation', () => {
  147 |   test.beforeEach(async ({ loginPage, profilePage }) => {
  148 |     await loginPage.login(validUser2.email, validUser2.password);
  149 |     await profilePage.clickEditButton();
  150 |   });
  151 |   test('[AQAPRACT-556] Leave "First name" field empty on "Edit personal information" flyout', async ({
  152 |     editProfilePage,
  153 |     profilePage,
  154 |   }) => {
  155 |     await editProfilePage.clearFirstName();
  156 |     await expect(editProfilePage.firstNameRequiredError).toBeVisible();
  157 |     await expect(editProfilePage.saveButton).toBeDisabled();
  158 |   });
  159 | 
  160 |   test('[AQAPRACT-557] Edit the "First name" with 1 character length', async ({
  161 |     editProfilePage,
  162 |     profilePage,
  163 |   }) => {
  164 |     await editProfilePage.updateFirstName('a'.repeat(1));
  165 |     await editProfilePage.submit();
  166 |     await expect(profilePage.logoText).toBeVisible();
```