import {Locator, Page} from '@playwright/test'
import { BasePage } from './basepage.spec'

export class LoginPage extends BasePage{

 private userNameInput : Locator;
 private passwordInput : Locator;
 private signInButton : Locator;
 readonly registrationLink : Locator ;

  constructor(page: Page) {
    super(page);
    this.userNameInput = page.getByPlaceholder('Enter email ');
    this.passwordInput = page.getByPlaceholder('Enter password');
    this.signInButton = page.getByRole('button', { name: 'Sign in'});
    this.registrationLink = page.getByRole('link', { name: 'Registration' });
  }

  async login(username : string , password : string ){
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async registerButton(): Promise<void> {
    await this.registrationLink.click();
}



}