import { debounceDom } from '@/utils/utils'

export default class AuthPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */

  constructor(page) {
    this.page = page
    this.createAccountButton = page.getByRole('link', {
      name: 'Create an Account'
    })
    this.firstNameInput = page.locator('#firstname')
    this.lastNameInput = page.locator('#lastname')
    this.emailInput = page.locator('#email_address')
    this.passwordInput = page.locator('#password')
    this.confirmPasswordInput = page.locator('#password-confirmation')
    this.pageTitle = page.locator('.page-title')
    this.submitForm = page.getByTitle('Create an Account')
    this.firstNameError = page.locator('#firstname-error')
    this.lastNameError = page.locator('#lastname-error')
    this.emailError = page.locator('#email_address-error')
    this.passwordError = page.locator('#password-error')
    this.actionMenu = page.getByRole('button', { name: /Change/i })
    this.signInLink = page.getByRole('link', { name: /Sign In/i })
    this.signInButton = page.getByRole('button', { name: /Sign In/i })
    this.signOutLink = page.getByRole('link', { name: /Sign Out/i })
    this.userEmail = page.getByTitle('Email')
    this.userPassword = page.getByTitle('Password')
    this.welcomeMessage = page.locator('.panel.wrapper').locator('.logged-in')
  }

  async addNewAccount(firstName, lastName, email, password) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.confirmPasswordInput.fill(password)
    await this.submitForm.click()
  }

  async signIn(email, password) {
    await this.signInLink.click()
    await this.userEmail.fill(email)
    await this.userPassword.fill(password)
    await this.signInButton.click()
  }

  async signOut() {
    await this.actionMenu.first().click()
    await debounceDom(this.page)
    await this.signOutLink.click()
    await expect.soft(this.pageTitle).toContainText('You are signed out')
  }
}
