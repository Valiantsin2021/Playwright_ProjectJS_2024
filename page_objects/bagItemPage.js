class BagItemPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getMoreInformationPanel: () => this.page.getByRole('link', { name: 'More Information' }),
    getMaterialInformation: () => this.page.locator('tbody tr td').nth(2)
  }

  async clickMoreImformationPanel() {
    await this.locators.getMoreInformationPanel().click()

    return this
  }

  async getMaterialInformationText() {
    return await this.locators.getMaterialInformation().innerText()
  }
}
export default BagItemPage
