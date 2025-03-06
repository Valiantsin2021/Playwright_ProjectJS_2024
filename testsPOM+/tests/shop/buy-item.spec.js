import { fakeCredentials } from '@/constants/auth-const'
import { confirmation, numberOfItems, shippingType } from '@/constants/shop-const'
import { existingCustomerData, markData } from '@/data/account-test-data'
import { items } from '@/data/shop-test-data'
import { test } from '@/page-objects/basePO'
import { generateRandomString } from '@/utils/utils'
import { expect } from '@playwright/test'

test.describe('Shopping flow validation', async () => {
  let randomEmail

  test.beforeAll(async () => {
    randomEmail = `${generateRandomString()}${fakeCredentials.EMAIL_SUFFIX}`
  })

  test.beforeEach(async ({ page, navigationPage }) => {
    // Navigate to sales tab
    await page.goto(`${process.env.FRONT_END_URL}`)
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
