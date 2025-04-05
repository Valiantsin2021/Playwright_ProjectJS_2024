import { runAccessibilityCheck } from '@helpers/accessibilityChecker'
import { test } from '@pages/base.js'
import MenTopsPage from '@pages/menTopsPage.js'
import ProductCardPage from '@pages/productCardPage.js'
const ENABLE_ACCESSIBILITY_CHECKS = process.env.ENABLE_ACCESSIBILITY_CHECKS === 'true'

test.describe('Product Card page', () => {
  test('Does not have accessibility violations', async ({ homePage, page }, testInfo) => {
    const menTopsPage = new MenTopsPage(page)
    const productCardPage = new ProductCardPage(page)
    await homePage.hoverMenLink()
    await homePage.clickMenTopsLink()
    await menTopsPage.clickProductCard('Cassius Sparring Tank')
    if (ENABLE_ACCESSIBILITY_CHECKS) {
      await runAccessibilityCheck(productCardPage.page, testInfo, 'product-card-page')
    }
  })
})
