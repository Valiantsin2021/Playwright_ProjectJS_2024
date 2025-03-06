class BreatheEasyTankPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getBreatheEasyTankHeader: () => this.page.getByRole('heading', { name: 'Breathe-Easy Tank' }),
    getBreatheEasyTankReviewsTab: () => this.page.locator('#product-review-container')
  }
}

export default BreatheEasyTankPage
