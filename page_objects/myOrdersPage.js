class MyOrdersPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getTitle: () => this.page.locator('span.base'),
    getViewOrdersLink: () => this.page.getByText('View Order'),
    getReorderLink: () => this.page.getByText('Reorder')
  }

  async waitgetTitle() {
    await this.locators.getTitle().waitFor({ state: 'visible' })
    return this
  }
}

export default MyOrdersPage
