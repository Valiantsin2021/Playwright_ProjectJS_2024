class ArgusAllWeatherTankPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getArgusAllWeatherTankPageHeader: () => this.page.getByRole('heading', { name: 'Argus All-Weather Tank' })
  }
}

export default ArgusAllWeatherTankPage
