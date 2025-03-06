import { expect } from '@playwright/test'
import AccountPage from '../account-po/accountPO'
import BasePage from '../base-po/basePO'
export default class ShopPage extends BasePage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */

  constructor(page) {
    super(page)
    this.accountPage = new AccountPage(page)
    this.productCards = page.locator('.product-item-info')
    this.productImage = page.locator('.product-image-container')
    this.pricesOnCards = page.locator('.normal-price')
    this.quantity = page.locator('#qty')
    this.addToCartButton = page.getByTitle('Add to Cart')
  }

  async addProductToCart(productName, numberOfItems, size, color) {
    const productCard = this.productCards.filter({
      hasText: productName
    })
    await expect.soft(productCard).toHaveCount(1)
    await productCard.locator(this.productImage).click()
    if (size) {
      await this.page.locator('.swatch-option.text').getByText(size, { exact: true }).click()
    }
    if (color) {
      await this.page.locator(`.swatch-option.color[aria-label=${color}]`).click()
    }
    await this.quantity.fill(numberOfItems)
    await this.addToCartButton.click()
    await expect.soft(this.accountPage.alertMessage).toBeVisible()
  }
}
