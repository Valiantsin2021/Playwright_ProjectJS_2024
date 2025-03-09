import {
  BASE_URL,
  EMPTY_CARD_MESSAGE,
  GEAR_PAGE_END_POINT,
  GEAR_PAGE_HEADER,
  MENU_GEAR_EXPECTED_ITEMS,
  SHIPPING_PAGE_END_POINT,
  SHIPPING_PROGRESS_BAR_TEXT,
  SHOPING_CART_COUNTER_NUMBER,
  shoppingItem1,
  shoppingItem2
} from '@helpers/data/testData.js'
import { expect, test } from '@pages/base.js'
import Header from '@pages/header.js'
import ShippingPage from '@pages/shippingPage.js'
test.describe('header.spec', () => {
  test('Verify quantity and total cost in the shopping cart', async ({ homePage, page }) => {
    const header = new Header(page)

    const radiantTeePage = await homePage.clickRadiantTee()
    await radiantTeePage.clickRadiantTeeSizeS()
    await radiantTeePage.clickRadiantTeeColorBlue()
    await radiantTeePage.clickAddToCartBtn()
    await radiantTeePage.clickRadiantTeeSizeM()
    await radiantTeePage.clickAddToCartBtn()

    await header.clickLogoLink()
    await header.clickCounterNumber()
    const quantityItems = shoppingItem1.quantity + shoppingItem2.quantity
    const totalCost = (shoppingItem1.price + shoppingItem2.price).toFixed(2)

    await expect.soft(header.locators.getTotalQuantity()).toHaveText(`${quantityItems}`)
    await expect.soft(header.locators.getTotalCost()).toHaveText('$' + totalCost)
  })

  test('Verify the Create an Account link is displayed on the main page in the header', async ({ homePage }) => {
    await expect.soft(homePage.locators.getCreateAccountLink()).toBeVisible()
  })

  test('"Proceed to Checkout" button in the Shopping Cart Modal Window is visible, clickable, and redirects to the Shipping Page', async ({ homePage, page }) => {
    const header = new Header(page)
    const shippingPage = new ShippingPage(page)

    const radiantTeePage = await homePage.clickRadiantTee()
    await radiantTeePage.clickRadiantTeeSizeS()
    await radiantTeePage.clickRadiantTeeColorBlue()
    await radiantTeePage.clickAddToCartBtn()

    await header.clickLogoLink()
    await header.clickCounterNumber()

    await expect.soft(header.locators.getProceedToCheckoutBtn()).toBeVisible()
    await header.clickProceedToCheckoutBtn()
    await shippingPage.locators.getShippingAddressHeader()
    await expect.soft(page).toHaveURL(BASE_URL + SHIPPING_PAGE_END_POINT)
    await expect.soft(shippingPage.locators.getShippingProgressBar()).toHaveText(SHIPPING_PROGRESS_BAR_TEXT)
  })

  test('verify display the shopping cart icon', async ({ homePage, page }) => {
    const header = new Header(page)

    await homePage.open()
    await expect.soft(header.locators.getShoppingCart()).toBeVisible()
  })

  test('verify the modal windows opens on click on shopping cart icon', async ({ homePage, page }) => {
    const header = new Header(page)

    await homePage.open()
    await header.locators.getShoppingCart().click()

    await expect.soft(header.locators.getMiniCart()).toBeVisible()
    await expect.soft(page).toHaveURL(BASE_URL)
  })

  test('verify display empty shopping cart message', async ({ homePage, page }) => {
    const header = new Header(page)

    await homePage.open()
    await header.locators.getShoppingCart().click()

    await expect.soft(header.locators.getEmptyCardMessage()).toHaveText(EMPTY_CARD_MESSAGE)
  })

  test('<Header/Shopping Cart Icon> Verify a counter with the number of items in the cart is displayed after adding new product', async ({ homePage, page }) => {
    const header = new Header(page)

    await homePage.clickHotSellersXSSizeButton(0)
    await homePage.clickHotSellersBlueColor(0)
    await homePage.clickHotSellersAddToCartButton(0)
    await header.waitForCounterNumber()

    await expect.soft(header.locators.getCounterNumber()).toHaveText(SHOPING_CART_COUNTER_NUMBER)
  })

  test('<Header/Header logo> Validate website has store logo', async ({ homePage }) => {
    const header = new Header(homePage.page)

    await expect.soft(header.locators.getLogoLink()).toBeVisible()
  })
  test('Verify only shopping cart icon is displayed if no items in the shopping cart', async ({ homePage }) => {
    const header = new Header(homePage.page)

    await header.locators.getShoppingCart()
    await header.locators.getCounterNumber()

    await expect.soft(header.locators.getShoppingCart()).toBeVisible()
    await expect.soft(header.locators.getCounterNumber()).not.toBeVisible()
  })

  test('Verify the modal windows can close', async ({ homePage, page }) => {
    const header = new Header(page)

    await homePage.open()
    await header.clickShoppingCartIcon()
    await header.clickCrossIconModalWindowShoppingCart()

    await expect.soft(header.locators.getEmptyCardMessage()).not.toBeVisible()
  })

  test('Gear drop-down menu contains: Bags, Fitness equipment, Watches items', async ({ homePage }) => {
    const header = new Header(homePage.page)
    await header.hoverGearMenu()

    await expect.soft(header.locators.getGearSubMenu()).toBeVisible()
    expect.soft(MENU_GEAR_EXPECTED_ITEMS).toEqual(await header.getGearSubMenuActualItems())
  })

  test('User could navigate from the Gear menu to the Gear page', async ({ homePage }) => {
    const header = new Header(homePage.page)
    await header.clickGearMenu()

    await expect.soft(header.page).toHaveURL(BASE_URL + GEAR_PAGE_END_POINT)
    await expect.soft(header.page).toHaveTitle(GEAR_PAGE_HEADER)
  })
})
