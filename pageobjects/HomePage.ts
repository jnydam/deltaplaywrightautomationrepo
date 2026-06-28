import { Page } from "@playwright/test";

class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getFlightStatusButton() {
    return this.page.locator("#headPrimary4");
  }
  async clickFlightsButton() {
    await this.getFlightStatusButton().click();
  }

  getStaysButton() {
    return this.page.locator("button").locator("span", { hasText: "Stays" });
  }

  async clickStaysButton() {
    await this.getStaysButton().click();
  }

  getVacationsButton() {
    return this.page
      .locator("button")
      .locator("span", { hasText: "Vacations" });
  }

  async clickVacationsButton() {
    await this.getVacationsButton().click();
  }

  getCheckInHeaderButton() {
    return this.page.locator("#headPrimary2");
  }

  async clickCheckInButton() {
    await this.getCheckInHeaderButton().click();
  }

  getTripsButton() {
    return this.page.locator("#headPrimary3");
  }

  async clickMyTripsButton() {
    await this.getTripsButton().click();
  }

  getCruisesButton() {
    return this.page.locator("button").locator("span", { hasText: "Cruises" });
  }
  async clickCruisesButton() {
    await this.getCruisesButton().click();
  }

  getCarsButton() {
    return this.page.locator("button").locator("span", { hasText: "Cars" });
  }

  async clickCarsButton() {
    await this.getCarsButton().click();
  }

  getAskMeAQuestionInput() {
    return this.page.getByRole("textbox", { name: "Try Asking Me A Question" });
  }

  async clickAskMeAQuestinoInput() {
    await this.getAskMeAQuestionInput().click();
  }

  async typeIntoAsMeAQuestionInput(text: string) {
    await this.getAskMeAQuestionInput().fill(text);
  }

  getAskMeQuestionSearchButton() {
    return this.page.locator("#homepage-footer-search-button");
  }

  async clickGetAskMeQuestionSearchButton() {
    await this.getAskMeQuestionSearchButton().click({ force: true });
  }

  getLoginHeaderButtonIdentifier() {
    return this.page.getByRole("button", {
      name: "Log in, opens in new popup",
    });
  }

  async clickLoginHeaderButtonIdentifier() {
    await this.getLoginHeaderButtonIdentifier().click();
  }
}

export default HomePage;
