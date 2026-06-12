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
  readonly firstNameRequiredError: Locator;
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
    this.firstNameRequiredError = page.locator(
      'div:has(input[name="firstName"]) >> text=Required'
    );
    this.lastNameRequiredError = page.locator(
      'div:has(input[name="lastName"]) >> text=Required'
    );
  }

  async updateFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.firstNameInput.blur();
  }

  async clearFirstName(): Promise<void> {
    await this.firstNameInput.fill('');
    await this.firstNameInput.blur();
  }

  async updateLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
    await this.lastNameInput.blur();
  }

  async clearLastName(): Promise<void> {
    await this.lastNameInput.fill('');
    await this.lastNameInput.blur();
  }

  async updateEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async updateDOB(dob: string): Promise<void> {
    await this.dobInput.fill(dob);
  }

  async submit(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
