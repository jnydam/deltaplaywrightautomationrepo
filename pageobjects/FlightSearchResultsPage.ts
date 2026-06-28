import { Page, expect } from "@playwright/test";

class FlightSearchResultsPaginationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getVacationsPageLocationIdentifier() {
    return this.page.locator("#from-and-to-swap-button");
  }

  async verifyStaysPageLocationIsDisplayed() {
    await expect(this.getVacationsPageLocationIdentifier()).toBeVisible();
  }
}

export default FlightSearchResultsPaginationPage;
