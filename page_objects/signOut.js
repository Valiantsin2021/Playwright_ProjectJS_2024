import SignInPage from './signInPage'

class HomePage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }
  locators = {
    getSignInLink: () => this.page.getByRole('link', { name: 'Sign In' })
  }

  async open() {
    await this.page.goto('/')
  }

  async clickSignInLink() {
    await this.locators.getSignInLink().click()
    return new SignInPage(this.page)
  }
}
export default HomePage
