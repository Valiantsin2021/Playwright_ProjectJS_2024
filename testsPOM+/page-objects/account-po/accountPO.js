export default class AccountPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */

  constructor(page) {
    this.page = page
    this.alertMessage = page.locator('.message-success')
    this.userInformation = page.locator('.box.box-information')
  }
}
