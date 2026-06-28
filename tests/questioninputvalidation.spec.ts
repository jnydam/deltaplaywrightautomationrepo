import { test } from "@playwright/test";
import HomePage from "../pageobjects/HomePage";
import AskQuestionsResultsPage from "../pageobjects/AskQuestionsResultsPage";
import LoginPopupPage from "../pageobjects/LoginPopupPage";
import JoinSkyMilesPage from "../pageobjects/JoinSkyMilesPage";

test.describe("Input Validations", () => {
  let homePage: HomePage;
  let askQuestionResultsPage: AskQuestionsResultsPage;
  let loginPage: LoginPopupPage;
  let skyMilesPage: JoinSkyMilesPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    askQuestionResultsPage = new AskQuestionsResultsPage(page);
    loginPage = new LoginPopupPage(page);
    skyMilesPage = new JoinSkyMilesPage(page);
    await page.goto("https://www.delta.com");
  });

  test("Validate that the user can ask how many flights are in a year at the bottom of the header", async () => {
    await homePage.clickAskMeAQuestinoInput();
    await homePage.typeIntoAsMeAQuestionInput(
      "How many flights are in a year?",
    );
    await homePage.clickGetAskMeQuestionSearchButton();
    await askQuestionResultsPage.verifyAskQuestionsResultsPageIsDisplayed();
  });

  test("Validate that an error shows up on the Login to Delta Modal Page", async () => {
    await homePage.clickLoginHeaderButtonIdentifier();
    await loginPage.clickUsernameInput();
    await loginPage.typeIntoUsernameInput("something");
    await loginPage.clickPasswordInput();
    await loginPage.typeIntoPasswordInput("somethingpasswordnow");
    await loginPage.clickLoginButtonIdentifier();
    await loginPage.verifyLoginErrorMessageIsDisplayed();
    await loginPage.verifyLoginErrorMessageIsDisplayed();
  });

  test("Validate that navigating to the JoinSkyMiles button triggers a launch to the Join Sky Miles Page", async () => {
    await homePage.clickLoginHeaderButtonIdentifier();
    await loginPage.clickJoinSkyMilesLoginButton();
    await skyMilesPage.verifyNameDatOfBirthBasicInfoIsVisible();
  });

  const dataEntries = [
    {
      firstName: "John",
      middleName: "Stone",
      lastName: "Nydam",
      month: "Mar",
      day: "6",
      year: "1997",
      gender: "Male (M)",
    },
    {
      firstName: "Mary",
      middleName: "Jane",
      lastName: "Smith",
      month: "Jun",
      day: "9",
      year: "1958",
      gender: "Female (F)",
    },
    {
      firstName: "Adam",
      middleName: "John",
      lastName: "Haymish",
      month: "Feb",
      day: "22",
      year: "1990",
      gender: "Unspecified (X)",
    },
  ];

  for (const dataEntry of dataEntries) {
    test(`Validate that user with info ${dataEntry.firstName} ${dataEntry.middleName} ${dataEntry.lastName} with gender ${dataEntry.gender} can enter basic Sky Miles Info in`, async ({
      page,
    }) => {
      await homePage.clickLoginHeaderButtonIdentifier();
      await loginPage.clickJoinSkyMilesLoginButton();

      await skyMilesPage.clickFirstNameInput();
      await skyMilesPage.typeIntoFirstNameInput(dataEntry.firstName);

      await skyMilesPage.clickMiddleNameInput();
      await skyMilesPage.typeIntoMiddleNameInput(dataEntry.middleName);

      await skyMilesPage.clickLastNameInput();
      await skyMilesPage.typeIntoLastNameInput(dataEntry.lastName);

      await skyMilesPage.clickMonthInput();
      await skyMilesPage.clickRoleOptionDropDownSelectByText(dataEntry.month);

      await skyMilesPage.clickDayInput();
      await skyMilesPage.clickRoleOptionDropDownSelectByText(dataEntry.day);

      await skyMilesPage.clickYearInput();
      await skyMilesPage.clickRoleOptionDropDownSelectByText(dataEntry.year);

      await skyMilesPage.clickGenderInput();
      await skyMilesPage.clickRoleOptionDropDownSelectByText(dataEntry.gender);

      await skyMilesPage.clickInfoNextButton();
      await skyMilesPage.verifyNameDatOfBirthBasicInfoIsNotVisible();
    });
  }
});
