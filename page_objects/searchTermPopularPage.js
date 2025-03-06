import Header from './header'

class SearchTermPopularPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getSearchTermPopularHeader: () => this.page.getByRole('heading', { name: 'Popular Search Terms' })
  }

  getHeader() {
    return new Header(this.page)
  }
}

export default SearchTermPopularPage
