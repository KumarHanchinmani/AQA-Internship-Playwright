import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage.spec';
import { RegistrationData } from '../data-types/registration.interface';

export class RegistrationPage extends BasePage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private dateOfBirth: Locator;
  private emailField: Locator;
  private passwordField: Locator;
  private confirmPasswordField: Locator;
  readonly submitButton: Locator;
  readonly signInLink: Locator;
  private readonly yearDropdown: Locator;
  private readonly monthDropdown: Locator;
  readonly minpasswordError: Locator;
  readonly maxpasswordError: Locator;
  readonly confirmpasswordError: Locator;
  readonly confirmPasswordRequired: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.dateOfBirth = page.getByPlaceholder('Date of birth');
    this.emailField = page.getByPlaceholder('Enter email');
    this.passwordField = page.getByPlaceholder('Enter password');
    this.confirmPasswordField = page.getByPlaceholder('Confirm Password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.signInLink = page.getByRole('link', { name: 'Sing in' });
    this.monthDropdown = page
      .locator('.react-datepicker__header select')
      .nth(1);
    this.yearDropdown = page.locator('.react-datepicker__header select').nth(0);
    this.minpasswordError = page.getByText(/minimum\s+8\s+characters/i);
    this.maxpasswordError = page.getByText(/maximum\s+20\s+characters/i);
    this.confirmpasswordError = page.getByText(/passwords\s+must\s+match/i);
    this.confirmPasswordRequired = page.getByText(/Required/i);
  }

  private dayLocator(day: number): Locator {
    const d = day.toString().padStart(2, '0');
    return this.page.locator(
      `.react-datepicker__day--0${d}:not(.react-datepicker__day--outside-month)`
    );
  }

  async fillForm(data: RegistrationData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dateOfBirth.click();
    await this.yearDropdown.selectOption({ label: data.birthDate.year });
    await this.monthDropdown.selectOption({ label: data.birthDate.month });
    await this.dayLocator(data.birthDate.day).click();
    await this.page.keyboard.press('Escape');
    await this.emailField.fill(data.email);
    await this.passwordField.fill(data.password);
    await this.confirmPasswordField.fill(data.confirmPassword);
  }

  async submit(): Promise<void> {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  async register(data: RegistrationData): Promise<void> {
    await this.fillForm(data);
    await this.submit();
  }
}
