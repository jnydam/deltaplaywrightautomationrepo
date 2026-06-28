import { Page, expect } from "@playwright/test";

class AskQuestionsResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getAskQuestionResultsPageIdentifier() {
    return this.page.getByRole("heading", { name: "Search Results" });
  }

  async verifyAskQuestionsResultsPageIsDisplayed() {
    await expect(
      await this.getAskQuestionResultsPageIdentifier(),
    ).toBeVisible();
  }
}

export default AskQuestionsResultsPage;
