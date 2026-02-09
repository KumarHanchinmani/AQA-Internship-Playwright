import { expect, Page } from '@playwright/test';



export class ProfilePage {
    readonly page: Page;
    readonly signoutButton;
  
    constructor(page: Page) {
      this.page = page;
      
      this.signoutButton = page.getByText('Sign Out');
    }
  }