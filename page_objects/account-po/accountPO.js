import BasePage from '../base-po/basePO'
export default class AccountPage extends BasePage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */

  constructor(page) {
    super(page)
    this.alertMessage = page.locator('.message-success')
    this.userInformation = page.locator('.box.box-information')
  }
}
