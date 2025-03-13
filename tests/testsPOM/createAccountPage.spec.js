import {
  ACCOUNT_FORM_EMPTY_INPUTS,
  BASE_URL,
  BUTTON_REGISTRATION_TITLE,
  CREATE_ACCOUNT_FORM_LABELS,
  CREATE_ACCOUNT_PAGE_HEADER,
  CREATE_ACCOUNT_PAGE_PASSWORD_ERROR_MESSAGE,
  CREATE_ACCOUNT_PAGE_PASSWORD_WITH_SPACES_MESSAGE,
  CUSTOMER_ACCOUNT_CREATE_END_POINT,
  EMAIL,
  FIRST_NAME,
  GEN_RANDOM_NUMBER,
  LAST_NAME,
  MY_ACCOUNT_HEADER,
  MY_ACCOUNT_PAGE_END_POINT,
  NEW_USER_DATA,
  PASSWORD,
  PASSWORD_CONFIRM,
  SIGN_IN_END_POINT,
  THANKS_MESSAGE
} from '@helpers/data/testData.js'
import { expect, test } from '@pages/base.js'
import CreateAccountPage from '@pages/createAccountPage.js'
import MyAccountPage from '@pages/myAccountPage.js'
import SignInPage from '@pages/signInPage.js'
test.describe('createAccuntPage.spec', () => {
  test('Check that user can possible to create account with entered all valid fields', async ({ homePage, page }) => {
    const createAccountPage = new CreateAccountPage(page)
    const myAccountPage = new MyAccountPage(page)

    await homePage.clickCreateAccountLink()
    await createAccountPage.clickFirstNameField()
    await createAccountPage.fillFirstNameField(FIRST_NAME)
    await createAccountPage.clickLastNameField()
    await createAccountPage.fillLastNameField(LAST_NAME)
    await createAccountPage.clickEmailField()
    await createAccountPage.fillEmailField(EMAIL)
    await createAccountPage.clickPasswordField()
    await createAccountPage.fillPasswordField(PASSWORD)
    await createAccountPage.clickConfirmPasswordField()
    await createAccountPage.fillConfirmPasswordField(PASSWORD_CONFIRM)
    await createAccountPage.clickCreateAccountButton()

    await expect.soft(myAccountPage.locators.getMyAccountHeader()).toHaveText(MY_ACCOUNT_HEADER)
    await expect.soft(myAccountPage.locators.getThanksMessage()).toHaveText(THANKS_MESSAGE)
  })

  test.skip('RF_TC 10.3.1_13 Registration/Create Account as a new user ', async ({ homePage, page }) => {
    const signInPage = new SignInPage(page)
    const createAccountPage = new CreateAccountPage(page)
    const myAccountPage = new MyAccountPage(page)

    await homePage.clickSignInLink()

    await expect.soft(page).toHaveURL(BASE_URL + SIGN_IN_END_POINT)
    await expect.soft(signInPage.locators.getCreateAnAccountButton()).toHaveText(BUTTON_REGISTRATION_TITLE)

    await signInPage.clickCreateAnAccountButton()

    await expect.soft(page).toHaveURL(BASE_URL + CUSTOMER_ACCOUNT_CREATE_END_POINT)
    await expect.soft(createAccountPage.locators.getCreateAccountHeader()).toHaveText(CREATE_ACCOUNT_PAGE_HEADER)

    await createAccountPage.fillFirstNameField(`${FIRST_NAME}${GEN_RANDOM_NUMBER}`)
    await createAccountPage.fillLastNameField(`${LAST_NAME}${GEN_RANDOM_NUMBER}`)
    await createAccountPage.fillEmailField(EMAIL)
    await createAccountPage.fillPasswordField(`${PASSWORD}${GEN_RANDOM_NUMBER}`)
    await createAccountPage.fillConfirmPasswordField(`${PASSWORD_CONFIRM}${GEN_RANDOM_NUMBER}`)
    await createAccountPage.clickCreateAccountButton()
    await page.reload()

    await expect.soft(page).toHaveURL(BASE_URL + MY_ACCOUNT_PAGE_END_POINT)
    await expect.soft(myAccountPage.locators.getMyAccountHeader()).toHaveText(MY_ACCOUNT_HEADER)
    await expect.soft(myAccountPage.locators.getThanksMessage()).toHaveText(THANKS_MESSAGE)
  })

  test('Check that all required fields are presented and empty in "Create New Customer Account" form', async ({ homePage }) => {
    const createAccountPage = await homePage.clickCreateAccountLink()

    expect.soft(await createAccountPage.getArrayOfFormLabels()).toEqual(CREATE_ACCOUNT_FORM_LABELS)
    expect.soft(await createAccountPage.getArrayOfFormInputs()).toEqual(ACCOUNT_FORM_EMPTY_INPUTS)
  })

  test("Check that user can't register with password less than 8 characters", async ({ homePage, page }) => {
    const createAccountPage = await homePage.clickCreateAccountLink()

    await createAccountPage.fillFirstNameField(NEW_USER_DATA.firstName)
    await createAccountPage.fillLastNameField(NEW_USER_DATA.lastName)
    await createAccountPage.fillEmailField(NEW_USER_DATA.newEmail)
    await createAccountPage.fillPasswordField(NEW_USER_DATA.shortPassword)
    await createAccountPage.fillConfirmPasswordField(NEW_USER_DATA.shortPassword)
    await createAccountPage.clickCreateAccountButton()

    await expect.soft(page).toHaveURL(BASE_URL + CUSTOMER_ACCOUNT_CREATE_END_POINT)
    await expect.soft(createAccountPage.locators.getPasswordErrorMessage()).toHaveText(CREATE_ACCOUNT_PAGE_PASSWORD_ERROR_MESSAGE)
  })

  NEW_USER_DATA.passwordWithSpaces.spacesLocation.forEach((condition, indx) => {
    test(`Verify that user can't register with password that ${condition} with spaces`, async ({ homePage, page }) => {
      const createAccountPage = await homePage.clickCreateAccountLink()

      await createAccountPage.fillFirstNameField(NEW_USER_DATA.firstName)
      await createAccountPage.fillLastNameField(NEW_USER_DATA.lastName)
      await createAccountPage.fillEmailField(NEW_USER_DATA.newEmail)
      await createAccountPage.fillPasswordField(NEW_USER_DATA.passwordWithSpaces.password[indx])
      await createAccountPage.fillConfirmPasswordField(NEW_USER_DATA.passwordWithSpaces.password[indx])
      await createAccountPage.clickCreateAccountButton()

      await expect.soft(page).toHaveURL(BASE_URL + CUSTOMER_ACCOUNT_CREATE_END_POINT)
      await expect.soft(createAccountPage.locators.getPageAlertBlock()).toHaveText(CREATE_ACCOUNT_PAGE_PASSWORD_WITH_SPACES_MESSAGE)
    })
  })
  test(`Verify createAccountPage match aria snapshot`, { tag: '@aria' }, async ({ homePage }) => {
    const createAccountPage = await homePage.clickCreateAccountLink()
    await expect.soft(createAccountPage.page.getByRole('tablist')).toMatchAriaSnapshot({ name: 'createAccountPage.yml' })
  })
})
