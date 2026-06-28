import { Page, expect } from "@playwright/test";

class StaysPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getStaysPageLocationIdentifier() {
    return this.page.locator("#mach-core-stays-widget-location");
  }

  async verifyStaysPageLocationIsDisplayed() {
    await expect(this.getStaysPageLocationIdentifier()).toBeVisible();
  }
}

export default StaysPage;
