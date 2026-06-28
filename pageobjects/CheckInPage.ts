import { Page, expect } from "@playwright/test";

class CheckInPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getCheckInConfirmationPageLocationIdentifier() {
    return this.page.locator("span", { hasText: "Confirmation Number" });
  }

  async verifyCheckInConfirmationNumberTextIsDisplayed() {
    await expect(
      this.getCheckInConfirmationPageLocationIdentifier(),
    ).toBeVisible();
  }
}

export default CheckInPage;
