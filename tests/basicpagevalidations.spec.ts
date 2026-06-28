import { test } from "@playwright/test";
import HomePage from "../pageobjects/HomePage";
import StaysPage from "../pageobjects/StaysPage";
import CarsPage from "../pageobjects/CarsPage";
import VacationsPage from "../pageobjects/VacationsPage";
import CruisesPage from "../pageobjects/CruisesPage";
import CheckInPage from "../pageobjects/CheckInPage";
import MyTripsPage from "../pageobjects/MyTripsPage";
import FlightStatusPage from "../pageobjects/FlightStatusPage";

test.describe("Delta Home Page to Header Link Validations", () => {
  let homePage: HomePage;
  let staysPage: StaysPage;
  let carsPage: CarsPage;
  let vacationsPage: VacationsPage;
  let cruisesPage: CruisesPage;
  let myTripsPage: MyTripsPage;
  let flightStatusPage: FlightStatusPage;
  let checkInPage: CheckInPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.delta.com");
    homePage = new HomePage(page);
    staysPage = new StaysPage(page);
    carsPage = new CarsPage(page);
    vacationsPage = new VacationsPage(page);
    myTripsPage = new MyTripsPage(page);
    flightStatusPage = new FlightStatusPage(page);
    cruisesPage = new CruisesPage(page);
    checkInPage = new CheckInPage(page);
  });

  test("Validate that the user can navigate to the Stays Page from Delta Home Page", async () => {
    await homePage.clickStaysButton();
    await staysPage.verifyStaysPageLocationIsDisplayed();
  });

  test("Validate that the user can navigate to the Cars Page from Delta Home Page", async () => {
    await homePage.clickCarsButton();
    await carsPage.verifyCarsPageLocationIsDisplayed();
  });

  test("Validate that the user can navigate to the Vacations Page from Delta Home Page", async () => {
    await homePage.clickVacationsButton();
    await vacationsPage.verifyVacationsFromToIconIsDisplayed();
  });

  test("Validate that the user can navigate to the Cruises Page from Delta Home Page", async ({
    context,
  }) => {
    const pagePromise = context.waitForEvent("page");
    await homePage.clickCruisesButton();
    const newPage = await pagePromise;
    cruisesPage.setPageContext(newPage);
    await cruisesPage.verifySearchCruiseDestinationTextIdentifierIsDisplayed();
  });

  test("Validate that the user can navigate to the Check-in Page from Delta Home Page", async () => {
    await homePage.clickCheckInButton();
    await checkInPage.verifyCheckInConfirmationNumberTextIsDisplayed();
  });

  test("Validate that the user can navigate to the My Trips Page from Delta Home Page", async () => {
    await homePage.clickMyTripsButton();
    await myTripsPage.verifyMyTripsConfirmationIsDisplayed();
  });

  test("Validate that the user can navigate to the Flight Status Page from Delta Home Page", async () => {
    await homePage.clickFlightsButton();
    await flightStatusPage.verifyFlightStatusFlightNumberIsDisplayed();
  });
});
