import { ORDERS_AND_RETURNS_HEADER } from '@helpers/data/testData.js'
import { expect, test } from '@pages/base.js'

test.describe('ordersAndReturnsPage.spec', () => {
  test('<Footer/Orders and Returns/page>Verify header "Orders and Returns" is displayed on the "Orders and Returns" page', async ({ homePage, page }) => {
    const ordersAndReturnsPage = await homePage.clickOrdersAndReturnsLink()

    await expect.soft(ordersAndReturnsPage.locators.getOrdersAndReturnsHeader()).toHaveText(ORDERS_AND_RETURNS_HEADER)
    await expect.soft(ordersAndReturnsPage.locators.getOrdersAndReturnsHeader()).toBeVisible()
  })
})
