import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage.page';

export class Calendar {
  public readonly previousMonth: Locator;
  public readonly nextMonth: Locator;
  public readonly yearDropdown: Locator;
  public readonly monthDropdown: Locator;
  private readonly page : Page ;

  constructor(page: Page) {
    this.page = page;
    this.previousMonth = page.getByRole('button').nth(0);
    this.nextMonth = page.getByRole('button').nth(1);
    this.yearDropdown = page.locator('.react-datepicker__header select').nth(0);
    this.monthDropdown = page
      .locator('.react-datepicker__header select')
      .nth(1);
  }

  async selectDate(date: { year: string; month: string; day: number }) {
    await this.yearDropdown.selectOption({ label: date.year });
    await this.monthDropdown.selectOption({ label: date.month });
    await this.dayLocator(date.day).click();
  }

  dayLocator(day: number): Locator {
    const d = day.toString().padStart(2, '0');
    return this.page.locator(
      `.react-datepicker__day--0${d}:not(.react-datepicker__day--outside-month)`
    );
  }

  async previousMonthDOB(): Promise<void> {
    await this.previousMonth.click();
  }

  async nextMonthDOB(): Promise<void> {
    await this.nextMonth.click();
  }

  async getCurrentMonth(): Promise<string> {
    return await this.monthDropdown.inputValue();
  }

  async getCurrentYear(): Promise<string> {
    return await this.yearDropdown.inputValue();
  }

  async isYearDropdownEnabled(): Promise<boolean> {
    return await this.yearDropdown.isEnabled();
  }

  async isMonthDropdownEnabled(): Promise<boolean> {
    return await this.monthDropdown.isEnabled();
  }

  async selectYear(year: string): Promise<void> {
    await this.yearDropdown.selectOption({ label: year });
  }

  async selectMonth(month: string): Promise<void> {
    await this.monthDropdown.selectOption({ label: month });
  }

  async getSelectedYear(): Promise<string> {
    return await this.yearDropdown.inputValue();
  }

  async getSelectedMonth(): Promise<string> {
    return await this.monthDropdown.inputValue();
  }

  async close() {
    await this.page.keyboard.press('Escape');
  }
}
