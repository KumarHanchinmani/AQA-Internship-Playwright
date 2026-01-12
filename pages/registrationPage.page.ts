import { expect, Locator, Page } from '@playwright/test';

import { BasePage } from './basePage.page';
import { RegistrationData } from '../data-types/registration.interface';
import { Calendar } from './calendar.page';

export class RegistrationPage extends BasePage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  readonly dateOfBirth: Locator;
  readonly emailField: Locator;
  private passwordField: Locator;
  private confirmPasswordField: Locator;
  readonly submitButton: Locator;
  readonly signInLink: Locator;
  readonly emailErrorMessage: Locator;
  readonly minpasswordError: Locator;
  readonly maxpasswordError: Locator;
  readonly confirmpasswordError: Locator;
  readonly confirmPasswordRequired: Locator;
  public calendar: Calendar;

  constructor(page: Page) {
    super(page);
    this.calendar = new Calendar(this.page);
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.dateOfBirth = page.getByPlaceholder('Date of birth');
    this.emailField = page.getByPlaceholder('Enter email');
    this.passwordField = page.getByPlaceholder('Enter password');
    this.confirmPasswordField = page.getByPlaceholder('Confirm Password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.signInLink = page.getByRole('link', { name: 'Sing in' });
    this.minpasswordError = page.getByText(/minimum\s+8\s+characters/i);
    this.maxpasswordError = page.getByText(/maximum\s+20\s+characters/i);
    this.confirmpasswordError = page.getByText(/passwords\s+must\s+match/i);
    this.confirmPasswordRequired = page.getByText(/Required/i);
    this.emailErrorMessage = page.getByText(/invalid email/i);
  }

  async fillForm(data: RegistrationData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);

    if (data.birthDate) {
      await this.dateOfBirth.click();
      await this.calendar.selectDate(data.birthDate);
      await this.calendar.close();
    }

    await this.emailField.fill(data.email);
    await this.passwordField.fill(data.password);
    await this.confirmPasswordField.fill(data.confirmPassword);
  }

  async submit(): Promise<void> {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  async openDOBCalendar(): Promise<void> {
    await this.dateOfBirth.click();
  }

  async getDOBValue(): Promise<string> {
    return await this.dateOfBirth.inputValue();
  }

  async register(data: RegistrationData): Promise<void> {
    await this.fillForm(data);
    await this.submit();
  }

  async expectEmailValidationError(message: string | RegExp): Promise<void> {
    await expect(this.emailErrorMessage).toBeVisible();
    await expect(this.emailErrorMessage).toHaveText(message);
  }

  async fillDateDirectly(date: string) {
    await this.dateOfBirth.fill(date);
    await this.calendar.close();
  }
}
