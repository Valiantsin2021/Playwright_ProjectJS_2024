class MenHotSellersPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getMenName: productsName => this.page.getByRole('heading', { name: productsName })
  }
}
export default MenHotSellersPage
