import { Page, expect } from "@playwright/test";

class VacationsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getVacationsPageLocationIdentifier() {
    return this.page.locator("#from-and-to-swap-button");
  }

  async verifyVacationsFromToIconIsDisplayed() {
    await expect(await this.getVacationsPageLocationIdentifier()).toBeVisible();
  }
}

export default VacationsPage;
