export default class BasePage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */

  constructor(page) {
    this.page = page
  }
  async open() {
    await this.page.addLocatorHandler(this.page.getByRole('button', { name: 'AGREE', exact: true }), async () => {
      await this.page.getByRole('button', { name: 'AGREE', exact: true }).click()
    })
    await this.page.goto('/')
  }
}
