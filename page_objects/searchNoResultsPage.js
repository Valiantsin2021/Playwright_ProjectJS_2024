import { ITEMS, WARNING_MESSAGE_NO_RESULTS } from '../helpers/data/testData'

class SearchNoResultsPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getWarningMessageNoResults: () => this.page.locator('.message.notice').getByText(WARNING_MESSAGE_NO_RESULTS),
    getNoResultsInfo: () => this.page.locator('#toolbar-amount').getByText(ITEMS)
  }
}

export default SearchNoResultsPage
