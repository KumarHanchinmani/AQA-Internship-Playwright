import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage.spec';
import { RegistrationData } from '../data-types/registration.interface';
import { Calendar } from './calendar.spec';

export class RegistrationPage extends BasePage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private dateOfBirth: Locator;
  private emailField: Locator;
  private passwordField: Locator;
  private confirmPasswordField: Locator;
  readonly submitButton: Locator;
  readonly signInLink: Locator;
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
    this.minpasswordError = page.getByText(/minimum\s+8\s+characters/i);
    this.maxpasswordError = page.getByText(/maximum\s+20\s+characters/i);
    this.confirmpasswordError = page.getByText(/passwords\s+must\s+match/i);
    this.confirmPasswordRequired = page.getByText(/Required/i);
  }

  private calendar = new Calendar(this.page);

  async fillForm(data: RegistrationData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dateOfBirth.click();
    await this.selectDateOfBirth(data.birthDate);
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

  async goToPreviousDOBMonth(): Promise<void> {
    await this.calendar.previousMonthDOB();
  }

  async goToNextDOBMonth(): Promise<void> {
    await this.calendar.nextMonthDOB();
  }

  async getDisplayedDOBMonth(): Promise<string> {
    return await this.calendar.getCurrentMonth();
  }

  async isDOBYearDropdownEnabled(): Promise<boolean> {
    return await this.calendar.isYearDropdownEnabled();
  }

  async isDOBMonthDropdownEnabled(): Promise<boolean> {
    return await this.calendar.isMonthDropdownEnabled();
  }

  async selectDOBYear(year: string): Promise<void> {
    await this.openDOBCalendar();
    await this.calendar.selectYear(year);
  }

  async getDisplayedDOBYear(): Promise<string> {
    return await this.calendar.getSelectedYear();
  }

  async selectDOBMonth(month: string): Promise<void> {
    await this.openDOBCalendar();
    await this.calendar.selectMonth(month);
  }

  async selectDateOfBirth(date: { year: string; month: string; day: number }) {
    await this.openDOBCalendar();
    await this.calendar.selectDate(date);
    await this.calendar.close();
  }

  async getDOBValue(): Promise<string> {
    return await this.dateOfBirth.inputValue();
  }

  async register(data: RegistrationData): Promise<void> {
    await this.fillForm(data);
    await this.submit();
  }
}
