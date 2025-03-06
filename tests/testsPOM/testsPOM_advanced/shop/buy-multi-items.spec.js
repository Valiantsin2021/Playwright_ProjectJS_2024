import { confirmation, numberOfItems, shippingType } from '@helpers/constants/shop-const'
import { stevenData } from '@helpers/data/account-test-data'
import { womanJackets } from '@helpers/data/shop-test-data'
import { expect, test } from '@pages/basePO'

test.describe('Batch shopping flow validation', async () => {
  test.beforeEach(async ({ navigationPage }) => {
    // Navigate to sales tab
    await navigationPage.open()
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
