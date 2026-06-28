import { Page, expect } from "@playwright/test";

class CruisesPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async setPageContext(page: Page) {
    this.page = page;
  }

  getSearchCruisePageLocationIdentifier() {
    return this.page.getByRole("textbox", {
      name: "Search cruise destinations",
    });
  }

  getSearchCruisePageOptionByText(text: string) {
    return this.page.getByRole("option", { name: text });
  }

  async clickSearchCruisePageOptionByText(text: string) {
    await this.getSearchCruisePageOptionByText(text).click();
  }

  async typeIntoSearchCruiseDestinationIdentifier(text: string) {
    await this.getSearchCruisePageLocationIdentifier().fill(text);
  }

  async verifySearchCruiseDestinationTextIdentifierIsDisplayed() {
    await expect(this.getSearchCruisePageLocationIdentifier()).toBeVisible();
  }

  getCruiseLengthButtonIdentifier() {
    return this.page.getByRole("button", {
      name: "Open the trip length cruise",
    });
  }

  async clickCruiseLengthButtonIdentifier() {
    await this.getCruiseLengthButtonIdentifier().click();
  }

  getCruiseSelectionNightsIdentifierByText(text: string) {
    return this.page.getByRole("button", {
      name: new RegExp(`${text}`, "i"),
    });
  }

  async clickCruiseSelectionNightsIdentifierByText(text: string) {
    await this.getCruiseSelectionNightsIdentifierByText(text).click();
  }

  getCruiseSelectionOptionsDoneButton() {
    return this.page.getByRole("link", { name: "Done with the cruise length" });
  }

  async clickCruiseSelectionOptionDoneButton() {
    await this.getCruiseSelectionOptionsDoneButton().click();
  }

  getViewCruisesButton() {
    return this.page.locator("#hp_searchContinue");
  }

  async clickViewCruisesButton() {
    await this.getViewCruisesButton().click();
  }

  getSendMeDealsModalButton() {
    return this.page.getByRole("button", { name: "SEND ME DEALS" });
  }

  getSendMeDealsModalCloseButton() {
    return this.page.getByRole("button", { name: "Close" });
  }

  async clickSendMeDealsModalCloseButton() {
    await this.getSendMeDealsModalCloseButton().click();
  }

  getCruiseSearchResultsIdentifier() {
    return this.page.getByRole("heading", { name: "Cruise Search Results" });
  }

  async verifyCruiseSearchResultsIdentifierIsDisplayed() {
    await expect(this.getCruiseSearchResultsIdentifier()).toBeVisible();
  }

  getCruiseLineButtonIdentifier() {
    return this.page.getByRole("button", {
      name: "Open the cruiseline cruise",
    });
  }

  async clickCruiseLineButtonIdentifier() {
    await this.getCruiseLineButtonIdentifier().click();
  }

  getSelectionCruiseLineOptionByText(text: string) {
    return this.page.getByRole("button", {
      name: new RegExp(`${text}`, "i"),
    });
  }

  async clickSelectionCruiseLineOptionByText(text: string) {
    await this.getSelectionCruiseLineOptionByText(text).click();
  }

  getDoneCruiseLineSelectionButton() {
    return this.page.getByRole("link", { name: "Done with the cruiseline" });
  }

  async clickDoneCruiseLineSelectionButton() {
    this.getDoneCruiseLineSelectionButton().click();
  }

  getCruiseLineSelectionDoneButton() {
    return this.page.getByRole("link", { name: "Done with the cruiseline" });
  }

  async clickCruiseLineSelectionDoneButton() {
    await this.getCruiseLineSelectionDoneButton().click();
  }
}

export default CruisesPage;
