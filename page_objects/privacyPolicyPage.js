class PrivacyPolicyPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getNavMenuItemList: () => this.page.locator('#privacy-policy-nav-content').getByRole('listitem'),
    getContentHeadersList: () => this.page.locator('h2')
  }
}
export default PrivacyPolicyPage
