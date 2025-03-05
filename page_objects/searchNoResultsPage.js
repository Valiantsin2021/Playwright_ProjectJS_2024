import { ITEMS, WARNING_MESSAGE_NO_RESULTS } from '../helpers/testData'

class SearchNoResultsPage {
  constructor(page) {
    this.page = page
  }

  locators = {
    getWarningMessageNoResults: () => this.page.locator('.message.notice').getByText(WARNING_MESSAGE_NO_RESULTS),
    getNoResultsInfo: () => this.page.locator('#toolbar-amount').getByText(ITEMS)
  }
}

export default SearchNoResultsPage
