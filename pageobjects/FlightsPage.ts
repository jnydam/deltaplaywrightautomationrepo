import { Page, expect } from "@playwright/test";

class FlightsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getVacationsPageLocationIdentifier() {
    return this.page.locator("#from-and-to-swap-button");
  }

  getCalendarNextButton() {
    return this.page.getByRole("button", { name: /Next month/i });
  }

  async clickCalendarNextButton() {
    await this.getCalendarNextButton().click();
  }

  getCalendarDaySelectionByDayText(dayText: string) {
    return this.page.getByRole("gridcell", {
      name: dayText,
      description:
        "Use arrow keys to navigate. Up and down arrows move by week, left and right arrows move by day.",
    });
  }

  async clickCalendarDaySelectionByDayText(dayText: string) {
    await this.getCalendarDaySelectionByDayText(dayText).click();
  }

  getCalendarPreviousButton() {
    return this.page.getByRole("button", { name: /Previous month/i });
  }

  async clickCalendarPreviousButton() {
    await this.getCalendarPreviousButton().click();
  }

  getFlightsFromButton() {
    return this.page.locator("#one-way-route-picker-origin-button");
  }

  getFlightsDepartButton() {
    return this.page.locator("button", { hasText: "Depart" });
  }

  async clickFlightsDepartButton() {
    await this.getFlightsDepartButton().click();
  }

  getFlightsFromInput() {
    return this.page.getByRole("textbox", { name: "Origin" });
  }

  getFlightsToInput() {
    return this.page.getByRole("textbox", { name: "Destination" });
  }

  getFlightsToButton() {
    return this.page.locator("#one-way-route-picker-destination-button");
  }

  getRoundTripSelectionButton() {
    return this.page.locator("button", { hasText: "Round Trip" });
  }

  getRoundTripListSelectionByText(text: string) {
    return this.page
      .getByRole("listbox", { name: "Trip Type options" })
      .getByRole("option", { name: text });
  }

  async clickByRouteSelectionText(routeSelectionText: string) {
    await this.getRoundTripListSelectionByText(routeSelectionText).click();
  }

  getPassengerDropDownEntryByText(text: string) {
    return this.page.getByRole("option", { name: text });
  }

  async clickPassengerDropDownEntryByText(text: string) {
    await this.getPassengerDropDownEntryByText(text).click();
  }

  getRightCalendarNavButton() {
    return this.page.locator("date-picker__nav-button--right");
  }

  getLeftCalendarNavButton() {
    return this.page.locator("date-picker__nav-button--left");
  }

  getRightCalendarHeadingByTitle(text: string) {
    return this.page
      .getByRole("dialog", { name: "Choose Dates" })
      .getByRole("heading", {
        name: new RegExp(`${text}`, "i"),
      });
  }

  async checkPresenceForRightCalendarHeadingByTitle(text: string) {
    return await this.getRightCalendarHeadingByTitle(text).isVisible();
  }

  getOuterDatePickerContainer() {
    return this.page.locator("div[aria-label='Choose Dates']");
  }

  getDoneCalendarDoneButton() {
    return this.page.locator("footer").locator("button", { hasText: "Done" });
  }

  getPassengerCountButton() {
    return this.page.locator("button", { hasText: "Passenger Count" });
  }

  getFindFlightsButton() {
    return this.page.getByRole("button", { name: "Find Flights" });
  }

  async clickFindFlightsButton() {
    await this.getFindFlightsButton().click();
  }

  async clickDoneCalendarDoneButton() {
    await this.getDoneCalendarDoneButton().click();
  }

  async clickPassengerCountButton() {
    await this.getPassengerCountButton().click();
  }

  async clickRoundTripListSelectionByText(text: string) {
    await this.getRoundTripListSelectionByText(text).click();
  }

  async clickRoundTripSelectionButton() {
    await this.getRoundTripSelectionButton().click();
  }

  async clickFlightsFromButton() {
    await this.getFlightsFromButton().click();
  }

  async clickFlightsToButton() {
    await this.getFlightsToButton().click();
  }

  async clickFlightsFromOriginInput() {
    await this.getFlightsFromInput().click();
  }

  async typeIntoFlightsFromOriginInput(text: string) {
    await this.getFlightsFromInput().clear();
    await this.getFlightsFromInput().fill(text);
  }

  async clickFlightsToOriginInput() {
    await this.getFlightsToInput().click();
  }

  async typeIntoFlightsToDestinationInput(text: string) {
    await this.getFlightsToInput().fill(text);
  }

  async clickDropDownFromToListElementByText(text: string) {
    await this.page.locator("li", { hasText: text }).click();
  }

  async verifyVacationsFromToIconIsDisplayed() {
    await expect(this.getVacationsPageLocationIdentifier()).toBeVisible();
  }
}

export default FlightsPage;
