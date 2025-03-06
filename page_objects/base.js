import * as base from '@playwright/test'
import { ADRESS_DATA, USER_DATA } from '../helpers/testData'
import HomePage from './homePage'
import MyAccountPage from './myAccountPage'
/**
 * @typedef {object} PagesTestArgs - HomePage test args
 * @property {HomePage} homePage     - HomePage
 * @property {MyAccountPage} myAccountPage     - myAccountPage
 *
 */
/** @type {base.Fixtures<PagesTestArgs, {}, base.PlaywrightTestArgs, base.PlaywrightWorkerArgs>} */

const extension = {
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await homePage.open()
    await use(homePage)
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page))
  },
  createNewAccount: [
    async ({ page }, use) => {
      const homePage = new HomePage(page)
      await homePage.open()
      const createAccountPage = await homePage.clickCreateAccountLink()
      await createAccountPage.fillFirstNameField(USER_DATA.firstName)
      await createAccountPage.fillLastNameField(USER_DATA.lastName)
      await createAccountPage.fillEmailField(USER_DATA.email)
      await createAccountPage.fillPasswordField(USER_DATA.password)
      await createAccountPage.fillConfirmPasswordField(USER_DATA.password)
      await createAccountPage.clickCreateAccountButton()

      await use('')
    },
    { scope: 'test' }
  ],

  addToShoppingCart: [
    async ({ page }, use) => {
      const myAccountPage = new MyAccountPage(page)
      const womenPage = await myAccountPage.clickWomenLink()
      const jacketsWomenPage = await womenPage.clickWomenJacketsLink()
      const inezFullZipJacketPage = await jacketsWomenPage.clickWomenJacketsName()
      await inezFullZipJacketPage.clickInezJacketSizeOptionLable()
      await inezFullZipJacketPage.clickInezJacketColorOptionLable()
      await inezFullZipJacketPage.clickInezJacketAddToCartButton()
      await inezFullZipJacketPage.waitForShoppingCartLink()

      await use('')
    },
    { scope: 'test' }
  ],

  createNewOrder: [
    async ({ page }, use) => {
      const myAccountPage = new MyAccountPage(page)
      const womenPage = await myAccountPage.clickWomenLink()
      const jacketsWomenPage = await womenPage.clickWomenJacketsLink()
      const inezFullZipJacketPage = await jacketsWomenPage.clickWomenJacketsName()
      await inezFullZipJacketPage.clickInezJacketSizeOptionLable()
      await inezFullZipJacketPage.clickInezJacketColorOptionLable()
      await inezFullZipJacketPage.clickInezJacketAddToCartButton()
      await inezFullZipJacketPage.waitForShoppingCartLink()
      const shoppingCartPage = await inezFullZipJacketPage.clickShoppingCartLink()
      await shoppingCartPage.waitForOrderTotalText()
      const shippingPage = await shoppingCartPage.clickProceedToCheckoutButton()
      await shippingPage.fillStreetNameField()
      await shippingPage.fillCityField(ADRESS_DATA.city)
      await shippingPage.clickSelectRegionDropdown()
      await shippingPage.fillPostCodeField(ADRESS_DATA.postal_code)
      await shippingPage.fillPhoneNumberField(ADRESS_DATA.phone_number)
      await shippingPage.checkByTypeRadioButton()
      const paymentMethodPage = await shippingPage.clickNextButton()
      await paymentMethodPage.waitPlaceOrderButton()

      await use('')
    },
    { scope: 'test' }
  ],
  signIn: [
    async ({ page }, use) => {
      const signInFunction = async (myEmail, myPassword) => {
        const homePage = new HomePage(page)
        await homePage.open()
        const signInPage = await homePage.clickSignInLink()
        await signInPage.fillEmailInputField(myEmail)
        await signInPage.fillPasswordInputField(myPassword)
        await signInPage.clickButtonSignIn()
      }
      await use(signInFunction)
    },
    { scope: 'test' }
  ]
}

export const test = base.test.extend(extension)
export const expect = base.expect
