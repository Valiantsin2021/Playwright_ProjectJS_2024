import { expect, test } from '@playwright/test'
import SignInPage from '../../page_objects/signInPage'
import HomePage from '../../page_objects/signOut'

test.describe('signOut.spec', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.open()
  })
  test('should be a greeting with the users name ', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.clickSignInLink()

    const signInPage = new SignInPage(page)
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()
    await page.waitForTimeout(3000)

    const isGreetingVisible = new SignInPage(page)
    expect.soft(isGreetingVisible).toBeTruthy()
  })

  test.skip('drop-down menu should open', async ({ page }) => {
    const homePage = new HomePage(page)

    await homePage.clickSignInLink()

    const signInPage = new SignInPage(page)
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()
    await page.waitForTimeout(4000)

    await signInPage.clickDpopdown()
    await expect.soft(signInPage.locators.getDropdownWishList()).toBeVisible()
  })

  test.skip('should be the "Log out" link, the user logs out of his account by clicking on it', async ({ page }) => {
    const homePage = new HomePage(page)

    await homePage.clickSignInLink()

    const signInPage = new SignInPage(page)
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()
    await page.waitForTimeout(4000)

    await signInPage.clickDpopdown()
    await signInPage.clickSignOut()
    await expect.soft(signInPage.locators.getMessageSignedOut()).toBeTruthy()
  })
})
