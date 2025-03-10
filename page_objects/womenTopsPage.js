class WomenTopsPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getShoppingOptionsHeading: () => this.page.getByRole('heading', { name: 'Shopping Options' }),
    getStyleDropDownMenu: () => this.page.getByRole('tab', { name: 'Style' }),
    getStyleList: () => this.page.locator('a[href*= "women/tops-women.html?style_general"]')
  }

  async clickShoppingOptionsHeading() {
    await this.locators.getShoppingOptionsHeading().click()
  }

  async clickStyleDropDownMenu() {
    await this.locators.getStyleDropDownMenu().click()

    return this
  }
}
export default WomenTopsPage
