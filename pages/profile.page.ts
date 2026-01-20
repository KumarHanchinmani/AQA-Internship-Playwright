import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage.page';

export class ProfilePage extends BasePage {
  readonly signOutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signOutButton = page.getByText('Sign Out');
  }
}
