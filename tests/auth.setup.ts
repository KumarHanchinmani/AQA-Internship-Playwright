import { test as setup, expect } from '@playwright/test';
import { validUser } from '../test-data/loginData';
import { LoginPage } from '../pages/loginPage.page';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 2. Navigate to your login environment route
  await page.goto('/login'); // Replace with your actual login URL path
        
  // 3. Execute actions using your exact constructor locators
  await expect(loginPage.signInHeading).toBeVisible();
  await loginPage.login(validUser.email, validUser.password);

  // 4. Verification Checkpoint: Ensure the app redirected to the profile view completely
  await expect(page).toHaveURL(/.*profile/);

  // 5. Dump the session cookies & tokens to disk for all subsequent tests
  await page.context().storageState({ path: authFile });
});
