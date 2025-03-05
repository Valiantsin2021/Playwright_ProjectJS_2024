import { expect, test } from '@playwright/test'
import { ORDERS_AND_RETURNS_HEADER } from '@helpers/testData.js'
import HomePage from '@pages/homePage.js'

test.describe('ordersAndReturnsPage.spec', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.open()
  })

  test('<Footer/Orders and Returns/page>Verify header "Orders and Returns" is displayed on the "Orders and Returns" page', async ({ page }) => {
    const homePage = new HomePage(page)
    const ordersAndReturnsPage = await homePage.clickOrdersAndReturnsLink()

    await expect.soft(ordersAndReturnsPage.locators.getOrdersAndReturnsHeader()).toHaveText(ORDERS_AND_RETURNS_HEADER)
    await expect.soft(ordersAndReturnsPage.locators.getOrdersAndReturnsHeader()).toBeVisible()
  })
})
