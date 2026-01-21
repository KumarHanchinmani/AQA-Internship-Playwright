import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage.page';
import { Links } from '../enums/links.enums';

export class LoginPage extends BasePage {
  private userNameInput: Locator;
  private passwordInput: Locator;
  readonly signInButton: Locator;
  readonly registrationButton: Locator;
  readonly emailRequiredErrorMessage: Locator;
  readonly passwordRequiredErrorMessage: Locator;
  readonly minpasswordError: Locator;
  readonly maxpasswordError: Locator;
  readonly emailInvalidError: Locator;
  readonly passwordInvalidError: Locator;
  readonly emailFormatError: Locator;

  constructor(page: Page) {
    super(page);
    this.userNameInput = page.getByPlaceholder('Enter email');
    this.passwordInput = page.getByPlaceholder('Enter password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.registrationButton = page.getByRole('link', { name: 'Registration' });
    this.emailRequiredErrorMessage = page.getByText(/Required/i);
    this.passwordRequiredErrorMessage = page.getByText(/Required/i);
    this.minpasswordError = page.getByText(/minimum\s+8\s+characters/i);
    this.maxpasswordError = page.getByText(/maximum\s+20\s+characters/i);
    this.emailInvalidError = page
      .getByText('Email or password is not valid')
      .first();
    this.passwordInvalidError = page
      .getByText('Email or password is not valid')
      .nth(1);
    this.emailFormatError = page.getByText('Invalid email address');
  }
  
  async open(): Promise<void> {
    await this.navigate(Links.LOGIN);
  }

  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async enterEmail(email: string): Promise<void> {
    await this.userNameInput.fill(email);
    await this.userNameInput.blur();
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async clickRegister(): Promise<void> {
    await this.registrationButton.click();
  }
}
