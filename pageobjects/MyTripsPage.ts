import { Page, expect } from "@playwright/test";

class MyTripsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getMyTripsPageLocationIdentifier() {
    return this.page.locator("span", { hasText: "Confirmation Number" });
  }

  async verifyMyTripsConfirmationIsDisplayed() {
    await expect(this.getMyTripsPageLocationIdentifier()).toBeVisible();
  }
}

export default MyTripsPage;
