import { fakeCredentials } from '@helpers/constants/auth-const'
import { confirmation, numberOfItems, shippingType } from '@helpers/constants/shop-const'
import { existingCustomerData, markData } from '@helpers/data/account-test-data'
import { items } from '@helpers/data/shop-test-data'
import { generateRandomString } from '@helpers/utils'
import { expect, test } from '@pages/basePO'

test.describe('Shopping flow validation', async () => {
  let randomEmail

  test.beforeAll(async () => {
    randomEmail = `${generateRandomString()}${fakeCredentials.EMAIL_SUFFIX}`
  })

  test.beforeEach(async ({ navigationPage }) => {
    // Navigate to sales tab
    await navigationPage.open()
    await navigationPage.saleMenuLink.click()
  })

  test('Verify that unregistered user can buy the product @smoke', async ({ shopPage, navigationPage, cartPage, authPage }) => {
    // Add Bag to the cart
    await navigationPage.bagsLink.click()
    await shopPage.addProductToCart(items.productName, items.numberOfItems)
    await expect.soft(cartPage.cartCounter).toHaveText(numberOfItems.ONE)
    // Checkout
    await cartPage.proceedToCheckout()
    await cartPage.fillCheckoutForm(markData, shippingType.FIXED)
    await expect.soft(authPage.pageTitle).toHaveText(confirmation.ORDER_PLACED)
  })

  test('Verify that registered user can buy the product @smoke', async ({ shopPage, navigationPage, cartPage, authPage }) => {
    await authPage.createAccountButton.click()
    await authPage.addNewAccount(fakeCredentials.FIRST_NAME, fakeCredentials.LAST_NAME, randomEmail, fakeCredentials.PASSWORD)
    // Add item to the cart
    await navigationPage.saleMenuLink.click()
    await navigationPage.bagsLink.click()
    await shopPage.addProductToCart(items.productName, items.numberOfItems)
    await expect.soft(cartPage.cartCounter).toHaveText(numberOfItems.ONE)
    // Checkout
    await cartPage.proceedToCheckout()
    await cartPage.fillCheckoutForm(existingCustomerData, shippingType.FIXED)
    await expect.soft(authPage.pageTitle).toHaveText(confirmation.ORDER_PLACED)
  })
})
