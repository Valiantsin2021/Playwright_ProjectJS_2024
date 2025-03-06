import { account } from '@helpers/constants/account-const'
import { fakeCredentials } from '@helpers/constants/auth-const'
import { generateRandomString } from '@helpers/utils'
import { expect, test } from '@pages/basePO'

test.describe('Sign in flow validation', async () => {
  let randomEmail

  test.beforeEach(async ({ authPage }) => {
    randomEmail = `${generateRandomString()}${fakeCredentials.EMAIL_SUFFIX}`
    // Navigate to the form
    await authPage.open()
    await authPage.createAccountButton.click()
    // Add new account
    await authPage.addNewAccount(fakeCredentials.FIRST_NAME, fakeCredentials.LAST_NAME, randomEmail, fakeCredentials.PASSWORD)
    // Wait for welcome message to appear
    await expect.soft(authPage.welcomeMessage).toContainText(`Welcome, ${fakeCredentials.FIRST_NAME} ${fakeCredentials.LAST_NAME}`)
    await authPage.signOut()
  })

  test('Verify login to existing account @smoke', async ({ authPage, accountPage }) => {
    // Sign in to existing account
    await authPage.signIn(randomEmail, fakeCredentials.PASSWORD)
    // Verify new user info is visible
    await expect.soft(authPage.pageTitle).toHaveText(account.NEW_TITLE)
    await expect.soft(accountPage.userInformation).toContainText(randomEmail)
  })

  test.afterAll(async () => {
    // ! TODO: discuss with team UX for account deletion
  })
})
