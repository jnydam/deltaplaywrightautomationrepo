import { Page, expect } from "@playwright/test";

class JoinSkyMilesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getFirstNameInput() {
    return this.page.getByRole("textbox", { name: "First Name" });
  }

  async clickFirstNameInput() {
    await this.getFirstNameInput().click();
  }

  async typeIntoFirstNameInput(text: string) {
    await this.getFirstNameInput().fill(text);
  }

  getMiddleNameInput() {
    return this.page.getByRole("textbox", {
      name: "Middle Name (As applicable)",
    });
  }

  async typeIntoMiddleNameInput(text: string) {
    this.getMiddleNameInput().fill(text);
  }

  async clickMiddleNameInput() {
    await this.getMiddleNameInput().click();
  }

  async typeIntoLastNameInput(text: string) {
    await this.getLastNameInput().fill(text);
  }

  getLastNameInput() {
    return this.page.getByRole("textbox", { name: "Last Name" });
  }

  async clickLastNameInput() {
    await this.getLastNameInput().click();
  }

  getMonthInput() {
    return this.page.getByRole("combobox", { name: "Month" });
  }

  async clickMonthInput() {
    await this.getMonthInput().click();
  }

  getDayInput() {
    return this.page.getByRole("combobox", { name: "Date" });
  }
  async clickDayInput() {
    await this.getDayInput().click();
  }

  getYearInput() {
    return this.page.getByRole("combobox", { name: "Year" });
  }

  async clickYearInput() {
    await this.getYearInput().click();
  }

  getGenderInput() {
    return this.page.getByRole("combobox", { name: "Gender" });
  }

  async clickGenderInput() {
    await this.getGenderInput().click();
  }

  getInfoNextButton() {
    return this.page.getByRole("button", { name: "Next" });
  }

  async clickInfoNextButton() {
    await this.getInfoNextButton().click();
  }

  getRoleOptionDropDownSelectByText(text: string) {
    return this.page.getByRole("option", { name: text, exact: true });
  }

  async clickRoleOptionDropDownSelectByText(text: string) {
    await this.getRoleOptionDropDownSelectByText(text).click();
  }

  getNameDateOfBirthBasicInfoText() {
    return this.page.getByText("Please enter your name, date");
  }

  async verifyNameDatOfBirthBasicInfoIsNotVisible() {
    await expect(this.getNameDateOfBirthBasicInfoText()).not.toBeVisible();
  }

  async verifyNameDatOfBirthBasicInfoIsVisible() {
    await expect(this.getNameDateOfBirthBasicInfoText()).toBeVisible();
  }
}

export default JoinSkyMilesPage;
