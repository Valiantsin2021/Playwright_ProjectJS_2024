import { expect } from '@playwright/test'
import MyAccountPage from './myAccountPage'

class CustomerLoginPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getAlert: () => this.page.getByRole('alert').getByText('You saved the account information.'),
    getEmailInputField: () => this.page.getByRole('textbox', { name: 'Email' }),
    getPasswordInputField: () => this.page.getByRole('textbox', { name: 'Password' }),
    getSignInBtn: () => this.page.getByRole('button', { name: 'Sign in' })
  }

  async fillEmailInputField(email) {
    await this.locators.getEmailInputField().fill(email)

    return this
  }

  async fillPasswordInputField(password) {
    await this.locators.getPasswordInputField().fill(password)

    return this
  }

  async clickSignInBtn() {
    await this.locators.getSignInBtn().focus()
    await this.locators.getSignInBtn().click()

    expect(await this.page.locator('[class="column main"] div:nth-child(5) [class="box-content"] p')).toBeVisible

    return new MyAccountPage(this.page)
  }
}
export default CustomerLoginPage
