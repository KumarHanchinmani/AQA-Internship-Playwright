import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage.page';

export class ProfilePage extends BasePage {
  readonly signOutButton: Locator;
  readonly header: Locator;
  readonly logoText: Locator;
  readonly logoImage: Locator;
  readonly userPhotoHeader: Locator;
  readonly userPhoto: Locator;
  readonly fullName: Locator;
  readonly position: Locator;
  readonly email: Locator;
  readonly technologies: Locator;
  readonly dateOfBirth: Locator;
  readonly editButton: Locator;
  readonly aqaDropdown: Locator;
  readonly footerLogo: Locator;
  readonly contactUs: Locator;
  readonly phoneNumber: Locator;
  readonly footerEmail: Locator;
  readonly dropdownSelect: Locator;
  readonly dropdownDragDrop: Locator;
  readonly dropdownActionsAlerts: Locator;

  constructor(page: Page) {
    super(page);
    this.signOutButton = page.getByText('Sign Out');
    this.header = page.locator('header');
    this.logoText = this.header.getByText('ANDERSEN');
    this.logoImage = this.header.getByRole('img', {
      name: 'Logo',
      exact: true,
    });
    this.userPhotoHeader = page.getByAltText('PhotoUrl');
    this.userPhoto = this.userPhoto = page
      .locator('[class*="rounded-full"]')
      .first();
    this.fullName = page.getByRole('heading', { level: 1 });
    this.position = page.getByText('Position');
    this.email = page.getByText('E-mail');
    this.technologies = page.getByText('Technologies');
    this.dateOfBirth = page.getByText('Date of birth');
    this.editButton = page.getByAltText('Edit');
    this.aqaDropdown = page.getByText('AQA Practice');
    this.footerLogo = page.getByAltText('Company Logo');
    this.contactUs = page.getByText('Contact us');
    this.phoneNumber = page.getByAltText('Phone');
    this.footerEmail = page.getByAltText('Email');
    this.dropdownSelect = page.getByText('Select');
    this.dropdownDragDrop = page.getByText('Drag & Drop');
    this.dropdownActionsAlerts = page.getByText('Actions, Alerts & Iframes');
  }

  async clickSignOut(): Promise<void> {
    await this.signOutButton.click();
  }

  async hoverAqaDropdown(): Promise<void> {
    await this.aqaDropdown.hover();
  }
}
