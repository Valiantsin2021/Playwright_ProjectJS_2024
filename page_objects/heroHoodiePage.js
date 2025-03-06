class HeroHoodiePage {
  constructor(page) {
    /**
     * Class constructor for BasePage.
     * @constructor
     * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
     */
    this.page = page
  }

  locators = {
    getHeroHoodieHeader: () => this.page.getByRole('heading', { name: 'Hero Hoodie' })
  }
}

export default HeroHoodiePage
