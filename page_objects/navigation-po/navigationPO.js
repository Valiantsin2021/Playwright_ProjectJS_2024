import BasePage from '../base-po/basePO'
export default class NavigationPage extends BasePage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */

  constructor(page) {
    super(page)
    this.saleMenuLink = page.getByRole('menuitem', { name: 'Sale' })
    this.bagsLink = page.getByRole('link', { name: 'Bags' })
    this.jacketsLink = page.getByRole('link', { name: 'Jackets' })
  }
}
