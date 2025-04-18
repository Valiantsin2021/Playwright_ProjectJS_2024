import { expect, test } from '@pages/base'
import SignInPage from '@pages/signInPage'
test.describe('menBottomWishList.spec', () => {
  test.beforeEach(async ({ homePage, page }) => {
    await homePage.clickSignInLink()
    const signInPage = new SignInPage(page)
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()
  })

  test('should be a wish list block with product details displayed on the page', async ({ homePage }) => {
    await homePage.hoverMenLink()
    const menBottomsPage = await homePage.clickMenBottomsLink()
    const pierceGymShortPage = await menBottomsPage.ckickPierceGymc()
    const wishListPage = await pierceGymShortPage.addWishList()
    await expect.soft(wishListPage.locators.getTitleMyWishList()).toBeVisible()
    expect.soft(wishListPage.locators.getItemQuantity()).toBeTruthy()
  })

  test('should be a link to "Go to the wish list"', async ({ homePage }) => {
    await homePage.hoverMenLink()
    const menBottomsPage = await homePage.clickMenBottomsLink()
    const pierceGymShortPage = await menBottomsPage.ckickPierceGymc()
    const wishListPage = await pierceGymShortPage.addWishList()

    await expect.soft(wishListPage.locators.getgotoWishListlink()).toBeTruthy()
    await expect.soft(wishListPage.locators.getTitleMyWishList()).toHaveCSS('text-align', 'start')
  })

  test.skip('should be a delete item button, a cross', async ({ homePage }) => {
    await homePage.hoverMenLink()
    const menBottomsPage = await homePage.clickMenBottomsLink()
    const pierceGymShortPage = await menBottomsPage.ckickPierceGymc()
    const wishListPage = await pierceGymShortPage.addWishList()

    await expect.soft(wishListPage.locators.getButtonClose()).toBeVisible()
    await wishListPage.clickButtonDelete()
    await expect.soft(wishListPage.locators.getTitleNoItems()).toBeVisible()
  })

  test.skip(' should be an "Add to Cart" button', async ({ homePage }) => {
    await homePage.hoverMenLink()
    const menBottomsPage = await homePage.clickMenBottomsLink()
    const pierceGymShortPage = await menBottomsPage.ckickPierceGymc()
    const wishListPage = await pierceGymShortPage.addWishList()

    await expect.soft(wishListPage.locators.getAddToCard()).toBeVisible()
    await wishListPage.clickAddCard()
    await expect.soft(pierceGymShortPage.locators.getProductShort()).toBeVisible()
  })
})
