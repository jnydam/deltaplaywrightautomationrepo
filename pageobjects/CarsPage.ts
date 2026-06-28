import { Page, expect } from "@playwright/test";

class CarsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  setPageContext(page: Page) {
    this.page = page;
  }

  getCarsResultsFilterByIdentifier() {
    return this.page.getByRole("heading", { name: "Filter by" });
  }

  async verifyCarResultsFilterByIdentifier() {
    await expect(this.getCarsResultsFilterByIdentifier()).toBeVisible({
      timeout: 25000,
    });
  }

  getCarsPageLocationIdentifier() {
    return this.page
      .locator("#location-field")
      .locator("label", { hasText: "Location" });
  }

  async verifyCarsPageLocationIsDisplayed() {
    await expect(this.getCarsPageLocationIdentifier()).toBeVisible();
  }

  getCarsPickupDateButton() {
    return this.page.getByRole("button", { name: "Select pick up date" });
  }

  async clickCarsPickupDateButton() {
    await this.getCarsPickupDateButton().click();
  }

  getCarsPickUpDateTimeButton() {
    return this.page.locator("#pickup-time-dropdown");
  }

  async clickCarsPickUpDateTimeButton() {
    await this.getCarsPickUpDateTimeButton().click();
  }

  getCarsDropOffDateButton() {
    return this.page.getByRole("button", { name: "Select drop off time" });
  }

  async clickCarsDropOffDateButton() {
    await this.getCarsDropOffDateButton().click();
  }

  getCarsDropOffDateTimeButton() {
    return this.page.locator("#dropoff-time-dropdown");
  }

  async clickCarsDropOffDateTimeButton() {
    await this.getCarsDropOffDateTimeButton().click();
  }

  getPickupCalendarHeadingByText(text: string) {
    return this.page
      .getByRole("dialog", { name: "Pick Up" })
      .getByRole("heading", { name: text });
  }

  getDropOffCalendarHeadingByText(text: string) {
    return this.page
      .getByRole("dialog", { name: "Drop Off" })
      .getByRole("heading", { name: text });
  }

  async checkPresenceForPickupCalendarHeadingByTitle(text: string) {
    return await this.getPickupCalendarHeadingByText(text).isVisible();
  }

  async checkPresenceForDropOffCalendarHeadingByTitle(text: string) {
    return await this.getDropOffCalendarHeadingByText(text).isVisible();
  }

  getNextMonthCalendarButton() {
    return this.page.getByRole("button", { name: /Next month/i });
  }

  async clickNextMonthCalendarButton() {
    await this.getNextMonthCalendarButton().click();
  }

  getCalendarDayByTextIdentifier(text: string) {
    return this.page.getByRole("gridcell", {
      name: new RegExp(`${text}`, "i"),
      description:
        "Use arrow keys to navigate. Up and down arrows move by week, left and right arrows move by day.",
    });
  }

  async clickCalendarDayByTextIdentifier(text: string) {
    await this.getCalendarDayByTextIdentifier(text).click();
  }

  getTimeOptionByText(text: string) {
    return this.page.getByRole("option", { name: text, exact: true });
  }

  async clickTimeOptionByText(text: string) {
    await this.getTimeOptionByText(text).click();
  }

  getFindCarsButton() {
    return this.page.getByRole("button", { name: "Search for car rentals" });
  }

  async clickFindCarsButton() {
    await this.getFindCarsButton().click();
  }

  getCarsLocationSearchInput() {
    return this.page.getByRole("combobox", { name: "Location" });
  }

  async clickCarsLocationSearchInput() {
    await this.getCarsLocationSearchInput().click();
  }

  async typeIntoCarsLocationSearchInput(text: string) {
    await this.getCarsLocationSearchInput().fill(text);
  }

  getLocationSelectionByText(text: string) {
    return this.page.getByRole("option", {
      name: new RegExp(`${text}`, "i"),
    });
  }

  async clickLocationSelectionByText(text: string) {
    await this.getLocationSelectionByText(text).click();
  }

  getLocationPickupButtonIdentifier() {
    return this.page.getByRole("button", {
      name: "Search car rental location",
    });
  }

  async clickLocationPickupButton() {
    await this.getLocationPickupButtonIdentifier().click();
  }
}

export default CarsPage;
