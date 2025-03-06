/* eslint-disable no-unused-vars */
// @ts-nocheck
import { BASE_URL, MY_ORDERS_HEADER, MY_ORDERS_PAGE_END_POINT } from '@helpers/testData.js'
import { expect, test } from '@pages/base.js'
import CheckoutOnepageSuccessPage from '@pages/checkoutOnepageSuccessPage.js'
import MyAccountPage from '@pages/myAccountPage.js'

test.describe('myOrders', () => {
  test('checkMyOrdersLink', async ({ homePage, createNewAccount }) => {
    const myAccountPage = new MyAccountPage(homePage.page)
    const myOrdersPage = await myAccountPage.clickMyOrdersLink()

    await expect.soft(homePage.page).toHaveURL(BASE_URL + MY_ORDERS_PAGE_END_POINT)
    await expect.soft(myOrdersPage.locators.getTitle()).toContainText(MY_ORDERS_HEADER)
  })

  test('OrderHistory', async ({ homePage, createNewAccount, createNewOrder }) => {
    const myAccountPage = new MyAccountPage(homePage.page)
    const checkoutOnepageSuccessPage = new CheckoutOnepageSuccessPage(homePage.page)
    await checkoutOnepageSuccessPage.waitContinueShoppingButton()
    await checkoutOnepageSuccessPage.clickActionSwitchButton()
    await checkoutOnepageSuccessPage.waitMyAccountLink()
    await checkoutOnepageSuccessPage.clickMyAccountLink()
    const myOrders = await myAccountPage.clickMyOrdersLink()
    await myOrders.waitgetTitle()

    await expect.soft(myOrders.locators.getViewOrdersLink()).toBeVisible()
    await expect.soft(myOrders.locators.getReorderLink()).toBeVisible()
  })
})
