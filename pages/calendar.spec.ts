import { Page, Locator } from '@playwright/test';

export class Calendar {
  readonly previousMonth: Locator;
  readonly nextMonth: Locator;
  readonly yearDropdown: Locator;
  readonly monthDropdown: Locator;
  page: Page;

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

  private dayLocator(day: number): Locator {
    const d = day.toString().padStart(2, '0');
    return this.page.locator(
      `.react-datepicker__day--0${d}:not(.react-datepicker__day--outside-month)`
    );
  }

  async close() {
    await this.page.keyboard.press('Escape');
  }
}
