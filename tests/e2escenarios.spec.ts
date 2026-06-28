import { test, BrowserContext, Page } from "@playwright/test";
import FlightsPage from "../pageobjects/FlightsPage";
import HomePage from "../pageobjects/HomePage";
import CarsPage from "../pageobjects/CarsPage";
import CruisesPage from "../pageobjects/CruisesPage";

type FlightParsingInput = {
  origin: string;
  originResult?: string;
  destination: string;
  tripType: string;
  startDate: string;
  endDate?: string;
  passengerCount: number;
};

type CarParsingInput = {
  pickupLocation: string;
  pickupLocationResult: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  context: BrowserContext;
};

type CruiseParsingInput = {
  cruiseLocation: string;
  nightOption: string;
  cruiseLiner?: string;
  context: BrowserContext;
  page: Page;
};

type CruiseData = {
  cruiseLocation: string;
  nightOption: string;
  cruiseLiner?: string;
};

test.describe("Delta.com Home Page Flight, Car, and Cruise Reservations E2E Scenarios", () => {
  let flightsPage: FlightsPage;
  let homePage: HomePage;
  let carsPage: CarsPage;
  let cruisesPage: CruisesPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.delta.com");
    flightsPage = new FlightsPage(page);
    homePage = new HomePage(page);
    carsPage = new CarsPage(page);
    cruisesPage = new CruisesPage(page);
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(1000);
  });

  const handleFlightInputParsing = async ({
    origin,
    originResult,
    destination,
    tripType,
    startDate,
    endDate,
    passengerCount,
  }: FlightParsingInput) => {
    await flightsPage.clickFlightsFromButton();
    await flightsPage.clickFlightsFromOriginInput();
    await flightsPage.typeIntoFlightsFromOriginInput(origin);
    await flightsPage.clickDropDownFromToListElementByText(
      originResult ? originResult : origin,
    );

    await flightsPage.clickFlightsToButton();
    await flightsPage.clickFlightsToOriginInput();
    await flightsPage.typeIntoFlightsToDestinationInput(destination);
    await flightsPage.clickDropDownFromToListElementByText(destination);

    await flightsPage.clickRoundTripSelectionButton();
    await flightsPage.clickRoundTripListSelectionByText(tripType);
    await flightsPage.clickFlightsDepartButton();

    while (
      !(await flightsPage.checkPresenceForRightCalendarHeadingByTitle(
        startDate.split(" ")[0],
      ))
    ) {
      await flightsPage.clickCalendarNextButton();
    }

    await flightsPage.clickCalendarDaySelectionByDayText(startDate);

    if (tripType === "Round Trip" && endDate) {
      while (
        !(await flightsPage.checkPresenceForRightCalendarHeadingByTitle(
          endDate.split(" ")[0],
        ))
      ) {
        await flightsPage.clickCalendarNextButton();
      }

      await flightsPage.clickCalendarDaySelectionByDayText(endDate);
    }

    await flightsPage.clickDoneCalendarDoneButton();
    await flightsPage.clickPassengerCountButton();
    await flightsPage.clickPassengerDropDownEntryByText(
      `${passengerCount} Passengers`,
    );
    await flightsPage.clickFindFlightsButton();
  };

  const handleCarsInputParsing = async ({
    dropoffDate,
    dropoffTime,
    pickupDate,
    pickupLocation,
    pickupTime,
    pickupLocationResult,
    context,
  }: CarParsingInput) => {
    await homePage.clickCarsButton();

    await carsPage.clickLocationPickupButton();
    await carsPage.typeIntoCarsLocationSearchInput(pickupLocation);

    await carsPage.clickLocationSelectionByText(pickupLocationResult);

    await carsPage.clickCarsPickupDateButton();
    while (
      !(await carsPage.checkPresenceForPickupCalendarHeadingByTitle(
        pickupDate.split(" ")[0],
      ))
    ) {
      await carsPage.clickNextMonthCalendarButton();
    }
    await carsPage.clickCalendarDayByTextIdentifier(pickupDate);

    await carsPage.clickCarsPickUpDateTimeButton();
    await carsPage.clickTimeOptionByText(pickupTime);

    await carsPage.clickCarsDropOffDateButton();

    while (
      !(await carsPage.checkPresenceForDropOffCalendarHeadingByTitle(
        dropoffDate.split(" ")[0],
      ))
    ) {
      await carsPage.clickNextMonthCalendarButton();
    }
    await carsPage.clickCalendarDayByTextIdentifier(dropoffDate);

    await carsPage.clickCarsDropOffDateTimeButton();
    await carsPage.clickTimeOptionByText(dropoffTime);

    const pagePromise = context.waitForEvent("page");
    await carsPage.clickFindCarsButton();

    const newPage = await pagePromise;
    carsPage.setPageContext(newPage);

    await carsPage.verifyCarResultsFilterByIdentifier();
  };

  const handleCruisesInputParsing = async ({
    cruiseLocation,
    nightOption,
    cruiseLiner,
    context,
    page,
  }: CruiseParsingInput) => {
    const pagePromise = context.waitForEvent("page");
    await homePage.clickCruisesButton();
    const newPage = await pagePromise;

    cruisesPage.setPageContext(newPage);
    await newPage.addLocatorHandler(
      cruisesPage.getSendMeDealsModalButton(),
      async () => {
        await cruisesPage.clickSendMeDealsModalCloseButton();
      },
    );
    await newPage.waitForTimeout(2000);

    await cruisesPage.typeIntoSearchCruiseDestinationIdentifier(cruiseLocation);

    await cruisesPage.clickSearchCruisePageOptionByText(cruiseLocation);
    await cruisesPage.clickCruiseLengthButtonIdentifier();
    await cruisesPage.clickCruiseSelectionNightsIdentifierByText(nightOption);
    await cruisesPage.clickCruiseSelectionOptionDoneButton();
    if (cruiseLiner) {
      await cruisesPage.clickCruiseLineButtonIdentifier();
      await cruisesPage.clickSelectionCruiseLineOptionByText(
        "Norwegian Cruise",
      );
      await cruisesPage.clickCruiseLineSelectionDoneButton();
    }
    await cruisesPage.clickViewCruisesButton();
    await cruisesPage.verifyCruiseSearchResultsIdentifierIsDisplayed();
  };

  const flightPageInformationData: FlightParsingInput[] = [
    {
      origin: "Boston",
      destination: "San Diego",
      tripType: "One Way",
      startDate: "November 26",
      passengerCount: 6,
    },
    {
      origin: "Dallas",
      originResult: "Dallas-Fort",
      destination: "San Diego",
      tripType: "Round Trip",
      startDate: "November 26",
      endDate: "February 18",
      passengerCount: 2,
    },
  ];

  for (const flightEntry of flightPageInformationData) {
    test(`As a delta.com customer, I should be able to find flights from ${flightEntry.origin} to ${flightEntry.destination} ${flightEntry.tripType} for ${flightEntry.passengerCount} people`, async () => {
      await handleFlightInputParsing({
        origin: flightEntry.origin,
        originResult: flightEntry.originResult,
        destination: flightEntry.destination,
        tripType: flightEntry.tripType,
        startDate: flightEntry.startDate,
        endDate: flightEntry.endDate,
        passengerCount: flightEntry.passengerCount,
      });
    });
  }

  test("As a delta.com customer, I should be able to find cars that I can pick up at Boston Logan International Airport on October 28th at 6:30 PM, and then planning to drop off November 15th at 10:15 AM", async ({
    context,
  }) => {
    await handleCarsInputParsing({
      context,
      dropoffDate: "November 15",
      dropoffTime: "10:15am",
      pickupDate: "October 28",
      pickupLocation: "Boston",
      pickupLocationResult: "Boston, MA, United States of America",
      pickupTime: "6:30pm",
    });
  });

  const cruiseLineInfo: CruiseData[] = [
    {
      cruiseLocation: "Alaska - Gulf of Alaska",
      nightOption: "6 to 8 Nights",
    },
    {
      cruiseLocation: "Hawaii",
      cruiseLiner: "Norwegian Cruise",
      nightOption: "6 to 8 Nights",
    },
  ];

  for (const cruiseLineInfoEntry of cruiseLineInfo) {
    test(`As a delta.com customer, I should be able to search for cruises near the ${cruiseLineInfoEntry.cruiseLocation} , that are ${cruiseLineInfoEntry.nightOption} in length ${cruiseLineInfoEntry.cruiseLiner ? `sailing with ${cruiseLineInfoEntry.cruiseLiner}` : ""}`, async ({
      context,
      page,
    }) => {
      await handleCruisesInputParsing({
        context,
        cruiseLiner: cruiseLineInfoEntry.cruiseLiner,
        cruiseLocation: cruiseLineInfoEntry.cruiseLocation,
        nightOption: cruiseLineInfoEntry.nightOption,
        page,
      });
    });
  }
});
