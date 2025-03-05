import { BASE_URL, MY_ORDERS_HEADER, MY_ORDERS_PAGE_END_POINT } from '@helpers/testData.js'
import { expect } from '@playwright/test'
import { test } from '@pages/base.js'
import CheckoutOnepageSuccessPage from '@pages/checkoutOnepageSuccessPage.js'
import MyAccountPage from '@pages/myAccountPage.js'

test.describe('myOrders', () => {
  test('checkMyOrdersLink', async ({ page, createNewAccount }) => {
    const myAccountPage = new MyAccountPage(page)
    const myOrdersPage = await myAccountPage.clickMyOrdersLink()

    await expect.soft(page).toHaveURL(BASE_URL + MY_ORDERS_PAGE_END_POINT)
    await expect.soft(myOrdersPage.locators.getTitle()).toContainText(MY_ORDERS_HEADER)
  })

  test('OrderHistory', async ({ page, createNewAccount, createNewOrder }) => {
    const myAccountPage = new MyAccountPage(page)
    const checkoutOnepageSuccessPage = new CheckoutOnepageSuccessPage(page)
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
