import { confirmation, numberOfItems, shippingType } from '@/constants/shop-const'
import { stevenData } from '@/data/account-test-data'
import { womanJackets } from '@/data/shop-test-data'
import { test } from '@/page-objects/basePO'
import { expect } from '@playwright/test'

test.describe('Batch shopping flow validation', async () => {
  test.beforeEach(async ({ page, navigationPage }) => {
    // Navigate to sales tab
    await page.goto(`${process.env.FRONT_END_URL}`)
    await navigationPage.saleMenuLink.click()
  })

  test('Verify that user can buy multiple items', async ({ navigationPage, shopPage, cartPage, authPage }) => {
    // Navigate to category women jackets
    await navigationPage.jacketsLink.first().click()
    // Iterate through test data
    const items = womanJackets
    for (const item of items) {
      const { productName, numberOfItems, size, color } = item
      await shopPage.addProductToCart(productName, numberOfItems, size, color)
      await navigationPage.jacketsLink.first().click()
    }
    await expect.soft(cartPage.cartCounter).toHaveText(numberOfItems.FOUR)
    // Checkout
    await cartPage.proceedToCheckout()
    await cartPage.fillCheckoutForm(stevenData, shippingType.FIXED)
    await expect.soft(authPage.pageTitle).toHaveText(confirmation.ORDER_PLACED)
  })
})
