import CheckoutOnepageSuccessPage from './checkoutOnepageSuccessPage'

class PaymentMethodPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getPlaceOrderButton: () => this.page.getByRole('button', { name: 'Place Order' })
  }

  async waitPlaceOrderButton() {
    await this.locators.getPlaceOrderButton().waitFor({ state: 'visible' })

    return this
  }

  async clickPlaceOrderButton() {
    await this.locators.getPlaceOrderButton().click()

    return new CheckoutOnepageSuccessPage(this.page)
  }
}

export default PaymentMethodPage
