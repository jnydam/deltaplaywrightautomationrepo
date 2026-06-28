import { test, expect } from "@playwright/test";

test.describe("Delta API Validations", () => {
  test("Verify that the nearest airport is Worcestor with ORH airport code", async ({
    request,
  }) => {
    const getResponse = await request.get(
      "https://www.delta.com/pref/geoLocationService/getClosestDeltaAirportCode",
    );

    expect(getResponse.ok()).toBeTruthy();
    const getResponseBody = await getResponse.json();
    expect(getResponseBody).toHaveProperty("cityname", "Worcester");
    expect(getResponseBody).toHaveProperty("airportcode", "ORH");
  });

  test("Verify that the Boston Logan International Airport is part of the delta cities list api", async ({
    request,
  }) => {
    const getResponse = await request.get(
      "https://www.delta.com/content/dam/delta-com/refdata/deltaCities.json",
    );

    expect(getResponse.ok()).toBeTruthy();
    const getResponseBody = await getResponse.json();
    expect(getResponseBody).toHaveProperty("BOS");
    const bostonObject = getResponseBody["BOS"];
    expect(bostonObject).toHaveProperty("airportName", "Logan Intl");
  });

  test("Verify that Southwest Airlines is a part of the airline names list api", async ({
    request,
  }) => {
    const getResponse = await request.get(
      "https://www.delta.com/content/dam/delta-com/refdata/airlineNames.json",
    );

    expect(getResponse.ok()).toBeTruthy();
    const getResponseBody = await getResponse.json();
    let southwestFound = false;
    for (const [key, value] of Object.entries(getResponseBody)) {
      const castedValue = value as { ArlnNm: string; IcaoArlnCd: string };
      if (castedValue.ArlnNm.includes("Southwest Airlines")) {
        southwestFound = true;
      }
    }
    expect(southwestFound).toBe(true);
  });

  test("Verify that the Euros (EUR) code is part of the country currency list api", async ({
    request,
  }) => {
    const getResponse = await request.get(
      "https://www.delta.com/content/dam/delta-com/refdata/countriesCurrencies.json",
    );

    expect(getResponse.ok()).toBeTruthy();
    const getResponseBody = await getResponse.json();
    let euroIdentifierFound = false;
    for (const [key, value] of Object.entries(getResponseBody)) {
      if (key === "EUR") {
        euroIdentifierFound = true;
      }
    }
    expect(euroIdentifierFound).toBe(true);
  });

  test("Verify that the Boeing 737-900 ER is a part of the industry aircrafts api", async ({
    request,
  }) => {
    const getResponse = await request.get(
      "https://www.delta.com/content/dam/delta-com/refdata/industryAircrafts.json",
    );

    expect(getResponse.ok()).toBeTruthy();
    const getResponseBody = await getResponse.json();
    let boeingFlightFound = false;
    for (const [key, value] of Object.entries(getResponseBody)) {
      const castedValue = value as {
        IndustryStandardAircraftTypeName: string;
        SeatingInfoText: string;
      };
      if (castedValue.IndustryStandardAircraftTypeName === "Boeing 737-900ER") {
        boeingFlightFound = true;
      }
    }
    expect(boeingFlightFound).toBe(true);
  });
});
