class OrdersAndReturnsPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getOrdersAndReturnsHeader: () => this.page.locator('h1')
  }
}
export default OrdersAndReturnsPage
