class SearchResultsJacketPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getSearchResultsHeader: () => this.page.locator('.page-title-wrapper')
  }
}

export default SearchResultsJacketPage
