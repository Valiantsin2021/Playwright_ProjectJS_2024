import { expect, test } from '@pages/base'
import SignInPage from '@pages/signInPage'

test.describe('signOut > ', () => {
  test('should be a greeting with the users name ', async ({ homePage }) => {
    await homePage.clickSignInLink()
    const signInPage = new SignInPage(homePage.page)
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()
    const isGreetingVisible = new SignInPage(homePage.page)
    expect.soft(isGreetingVisible).toBeTruthy()
  })

  test('drop-down menu should open', async ({ homePage }) => {
    await homePage.clickSignInLink()
    const signInPage = new SignInPage(homePage.page)
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()
    await signInPage.clickDpopdown()
  })

  test.skip('should be the "Log out" link, the user logs out of his account by clicking on it', async ({ homePage }) => {
    await homePage.clickSignInLink()

    const signInPage = new SignInPage(homePage.page)
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()
    await signInPage.clickDpopdown()
    await signInPage.clickSignOut()
    await expect.soft(signInPage.locators.getMessageSignedOut()).toBeTruthy()
  })
})
