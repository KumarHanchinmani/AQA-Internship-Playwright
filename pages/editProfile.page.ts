import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage.page';

export class EditProfilePage extends BasePage {
  readonly title: Locator;
  readonly subTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly dobLabel: Locator;
  readonly dobInput: Locator;
  readonly closeButton: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;
  readonly lastNameRequiredError: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole('heading', {
      name: 'Edit personal information',
    });
    this.subTitle = page.getByText(
      'Please, provide your personal information in English.'
    );
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByPlaceholder('E-mail');
    this.dobLabel = page.getByLabel('Date of Birth');
    this.dobInput = page.locator('input[name=dateOfBirth]');
    this.closeButton = page.getByAltText('Close');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.lastNameRequiredError = page.locator(
      'div:has(input[name="lastName"]) >> text=Required'
    );
  }

  async updateFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async updateLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async updateEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async updateDOB(dob: string) {
    await this.dobInput.fill(dob);
  }

  async submit() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async close() {
    await this.closeButton.click();
  }

  async clearLastName(): Promise<void> {
    await this.lastNameInput.fill('');
    await this.lastNameInput.blur();
  }
}
