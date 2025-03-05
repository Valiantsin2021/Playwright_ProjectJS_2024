import { expect, test } from '@playwright/test'
import SignInPage from '@pages/signInPage'
import HomePage from '@pages/signOut'
let homePage
test.describe('signOut.spec', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.open()
  })
  test('should be a greeting with the users name ', async ({ page }) => {
    await homePage.clickSignInLink()

    const signInPage = new SignInPage(page)
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()
    const isGreetingVisible = new SignInPage(page)
    expect.soft(isGreetingVisible).toBeTruthy()
  })

  test('drop-down menu should open', async ({ page }) => {
    await homePage.clickSignInLink()

    const signInPage = new SignInPage(page)
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()
    await signInPage.clickDpopdown()
    await expect.soft(signInPage.locators.getDropdownWishList()).toBeVisible()
  })

  test.skip('should be the "Log out" link, the user logs out of his account by clicking on it', async ({ page }) => {
    await homePage.clickSignInLink()

    const signInPage = new SignInPage(page)
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()
    await signInPage.clickDpopdown()
    await signInPage.clickSignOut()
    await expect.soft(signInPage.locators.getMessageSignedOut()).toBeTruthy()
  })
})
