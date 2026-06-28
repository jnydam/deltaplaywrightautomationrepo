import { Page, expect } from "@playwright/test";

class FlightStatusPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getFlightStatusPageLocationIdentifier() {
    return this.page.locator("#flightNumber");
  }

  async verifyFlightStatusFlightNumberIsDisplayed() {
    await expect(this.getFlightStatusPageLocationIdentifier()).toBeVisible();
  }
}

export default FlightStatusPage;
