import { Page, expect } from "@playwright/test";

class LoginPopupPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getLoginErrorMessage() {
    return this.page.getByText("We weren't able to log you in");
  }

  getErrorIconIdentifier() {
    return this.page.locator("#sticky-login-message-banner-icon");
  }

  async verifyLoginErrorMessageIsDisplayed() {
    await expect(this.getLoginErrorMessage()).toBeVisible({ timeout: 10000 });
  }

  async verifyErrorIconIdentifierIsDisplayed() {
    await expect(this.getErrorIconIdentifier()).toBeVisible();
  }

  getLoginUsernameInputIdentifier() {
    return this.page.getByRole("textbox", {
      name: "SkyMiles Number or Username",
    });
  }

  async typeIntoUsernameInput(text: string) {
    await this.getLoginUsernameInputIdentifier().fill(text);
  }

  async clickUsernameInput() {
    await this.getLoginUsernameInputIdentifier().click();
  }

  getPasswordInputIdentifier() {
    return this.page.getByRole("textbox", { name: "Password" });
  }

  async clickPasswordInput() {
    this.getPasswordInputIdentifier().click();
  }

  async typeIntoPasswordInput(text: string) {
    await this.getPasswordInputIdentifier().fill(text);
  }

  getLoginButtonIdentifier() {
    return this.page.getByRole("button", { name: "Log In", exact: true });
  }

  async clickLoginButtonIdentifier() {
    await this.getLoginButtonIdentifier().click();
  }

  getJoinSkyMilesLoginButton() {
    return this.page.getByRole("button", { name: "Join SkyMiles" });
  }

  async clickJoinSkyMilesLoginButton() {
    await this.getJoinSkyMilesLoginButton().click();
  }
}

export default LoginPopupPage;
