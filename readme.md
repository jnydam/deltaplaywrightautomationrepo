A test automation framework using Playwright (https://playwright.dev/) for the consumer facing Delta.com website. Validations include ensuring that link navigations to different header pages are working properly, and E2E scenarios for flight, car, and cruise scheduling are functional. API validations for airline names, country currencies, and delta cities included.

To run the tests, please follow the following steps.

1. git clone https://github.com/jnydam/deltaplaywrightautomationrepo.git

2. cd deltaplaywrightautomationrepo/

3. npm install

4. npx playwright test

5. npx playwright show-report (to see reports once tests have finished)
