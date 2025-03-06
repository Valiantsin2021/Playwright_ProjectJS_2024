import { account } from '@/constants/account-const'
import { errors, fakeCredentials } from '@/constants/auth-const'
import { generateRandomString } from '@/utils/utils'
import { expect } from '@playwright/test'
import { test } from 'src/page-objects/basePO'

test.describe('Sigh up flow validation', async () => {
  let randomEmail

  test.beforeAll(async () => {
    randomEmail = `${generateRandomString()}${fakeCredentials.EMAIL_SUFFIX}`
  })

  test.beforeEach(async ({ page, authPage }) => {
    // Navigate to the form
    await page.goto(`${process.env.FRONT_END_URL}`)
    await authPage.createAccountButton.click()
  })

  test('Verify that account can be created @smoke', async ({ authPage, accountPage }) => {
    // Fill the form
    await authPage.addNewAccount(fakeCredentials.FIRST_NAME, fakeCredentials.LAST_NAME, randomEmail, fakeCredentials.PASSWORD)
    // Verify that account was created
    await expect.soft(accountPage.alertMessage).toContainText(account.SUCCESS_MESSAGE)
  })

  test('Verify logic for required fields', async ({ authPage }) => {
    // Submit empty form
    await authPage.submitForm.click()
    // Check that errors appears
    await expect.soft(authPage.firstNameError).toHaveText(errors.FIELD_IS_REQUIRED)
    await expect.soft(authPage.lastNameError).toHaveText(errors.FIELD_IS_REQUIRED)
    await expect.soft(authPage.emailError).toHaveText(errors.FIELD_IS_REQUIRED)
    await expect.soft(authPage.passwordError).toHaveText(errors.FIELD_IS_REQUIRED)
  })

  test.afterAll(async () => {
    // ! TODO: discuss with team UX for account deletion
  })
})
