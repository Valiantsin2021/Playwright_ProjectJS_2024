import { BASE_URL, EMPTY_CARD_MESSAGE, SHOPPING_CART_END_POINT, WOMEN_JACKETS_NAME } from '@helpers/testData.js'
import { expect } from '@playwright/test'
import { test } from '@pages/base.js'
import MyAccountPage from '@pages/myAccountPage.js'

test.describe('shopping Cart', () => {
  test('Validate link Move to Wish List located on the Shopping Cart page', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page)
    await myAccountPage.waitForMyAccountHeader()
    const womenPage = await myAccountPage.clickWomenLink()
    const jacketsWomenPage = await womenPage.clickWomenJacketsLink()
    const inezFullZipJacketPage = await jacketsWomenPage.clickWomenJacketsName()
    await inezFullZipJacketPage.clickInezJacketSizeOptionLable()
    await inezFullZipJacketPage.clickInezJacketColorOptionLable()
    await inezFullZipJacketPage.clickInezJacketAddToCartButton()
    await inezFullZipJacketPage.waitForShoppingCartLink()
    const shoppingCartPage = await inezFullZipJacketPage.clickShoppingCartLink()

    await expect.soft(shoppingCartPage.locators.getMoveToWishListLink()).toBeVisible()
  })

  test('Validate the message - the product has been moved to your wish list', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page)
    const womenPage = await myAccountPage.clickWomenLink()
    const jacketsWomenPage = await womenPage.clickWomenJacketsLink()
    const inezFullZipJacketPage = await jacketsWomenPage.clickWomenJacketsName()
    await inezFullZipJacketPage.clickInezJacketSizeOptionLable()
    await inezFullZipJacketPage.clickInezJacketColorOptionLable()
    await inezFullZipJacketPage.clickInezJacketAddToCartButton()
    const shoppingCartPage = await inezFullZipJacketPage.clickShoppingCartLink()
    await shoppingCartPage.waitForMoveToWishListLink()
    await shoppingCartPage.clickMoveToWishListLink()

    await expect.soft(shoppingCartPage.locators.getAlerMessageAddToWishList()).toHaveText(`${WOMEN_JACKETS_NAME} has been moved to your wish list.`)
  })

  test('Redirected to the updated Shopping cart page after add item to Wish List', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page)
    const womenPage = await myAccountPage.clickWomenLink()
    const jacketsWomenPage = await womenPage.clickWomenJacketsLink()
    const inezFullZipJacketPage = await jacketsWomenPage.clickWomenJacketsName()
    await inezFullZipJacketPage.clickInezJacketSizeOptionLable()
    await inezFullZipJacketPage.clickInezJacketColorOptionLable()
    await inezFullZipJacketPage.clickInezJacketAddToCartButton()
    const shoppingCartPage = await inezFullZipJacketPage.clickShoppingCartLink()
    await shoppingCartPage.waitForMoveToWishListLink()
    await shoppingCartPage.clickMoveToWishListLink()

    await expect.soft(page).toHaveURL(BASE_URL + SHOPPING_CART_END_POINT)
    await expect.soft(shoppingCartPage.locators.getEmptyCartMessage()).toContainText(`${EMPTY_CARD_MESSAGE}`)
  })
})
