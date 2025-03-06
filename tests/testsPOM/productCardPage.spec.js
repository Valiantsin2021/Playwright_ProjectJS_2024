import HomePage from '@pages/homePage.js'
import MenTopsPage from '@pages/menTopsPage.js'
import ProductCardPage from '@pages/productCardPage.js'
import { expect, test } from '@playwright/test'
let homePage
test.describe('productCardPage.spec', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.open()
  })

  test('Verify that the Product Card has the Related Products section on the Men/Tops page', async ({ page }) => {
    test.slow()
    const menTopsPage = new MenTopsPage(page)
    const productCardPage = new ProductCardPage(page)
    await homePage.hoverMenLink()
    await homePage.clickMenTopsLink()

    const LIST_OF_PRODUCT_CARD_TITLES = await menTopsPage.locators.getListOfProductCardTitles().allInnerTexts()

    for (let i = 0; i < LIST_OF_PRODUCT_CARD_TITLES.length; i++) {
      await menTopsPage.clickProductCard(LIST_OF_PRODUCT_CARD_TITLES[i])
      await expect.soft(productCardPage.locators.getRelatedProductsSection()).toBeVisible()
      await expect.soft(productCardPage.locators.getRelatedProductsSectionTitle()).toHaveText('Related Products')
      await productCardPage.goBackToMenTopsPage()
    }
  })

  test('Verify Product Card in the Related Products section opens correct page', async () => {
    test.slow()
    await homePage.hoverMenLink()
    const menTopsPage = await homePage.clickMenTopsLink()

    const LIST_OF_PRODUCT_CARD_TITLES = await menTopsPage.locators.getListOfProductCardTitles().allInnerTexts()

    for (let i = 0; i < LIST_OF_PRODUCT_CARD_TITLES.length; i += 4) {
      const productCardPage = await menTopsPage.clickProductCard(LIST_OF_PRODUCT_CARD_TITLES[i])

      const LIST_OF_RELATED_PRODUCTS = await productCardPage.locators.getListOfRelatedProductsTitles().allInnerTexts()
      for (let j = 0; j < LIST_OF_RELATED_PRODUCTS.length; j += 3) {
        await productCardPage.openRelatedProductCard(j)
        await expect.soft(productCardPage.locators.getProductCardTitile()).toHaveText(LIST_OF_RELATED_PRODUCTS[j])
        await productCardPage.goBackToMenTopsPage()
      }
      await productCardPage.goBackToProductCardPage()
    }
  })
})
