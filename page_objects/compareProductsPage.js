class CompareProductsPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getCompareProductsHeader: () => this.page.getByRole('heading', { name: 'Compare Products' }).locator('span'),
    getCompareProductsItem: () => this.page.getByText('Push It Messenger Bag', { exact: true })
  }
}
export default CompareProductsPage
