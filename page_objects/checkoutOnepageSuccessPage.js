import MyAccountPage from './myAccountPage'

class CheckoutOnepageSuccessPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getActionSwitchButton: () => this.page.locator('(//button[@class = "action switch"])[1]'),
    getMyAccountLink: () => this.page.locator('(//a[text() = "My Account"])[1]'),
    getContinueShoppingButton: () => this.page.getByText('Your order number is: ')
  }

  async clickActionSwitchButton() {
    await this.locators.getActionSwitchButton().click()

    return this
  }

  async waitContinueShoppingButton() {
    await this.locators.getContinueShoppingButton().waitFor({ state: 'visible' })
    return this
  }
  async waitMyAccountLink() {
    await this.locators.getMyAccountLink().waitFor()
    return this
  }

  async clickMyAccountLink() {
    await this.locators.getMyAccountLink().click()

    return new MyAccountPage(this.page)
  }
}
export default CheckoutOnepageSuccessPage
