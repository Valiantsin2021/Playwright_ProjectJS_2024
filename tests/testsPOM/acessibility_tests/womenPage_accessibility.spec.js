import { runAccessibilityCheck } from '@helpers/accessibilityChecker'
import { test } from '@pages/base.js'
const ENABLE_ACCESSIBILITY_CHECKS = process.env.ENABLE_ACCESSIBILITY_CHECKS === 'true'

test.describe('womenPage.spec', () => {
  test("Navigate to Women's Tees page by clicking Promo link on 'Women' page", async ({ homePage, page }, testInfo) => {
    const womenPage = await homePage.clickWomenLink()
    if (ENABLE_ACCESSIBILITY_CHECKS) {
      await runAccessibilityCheck(womenPage.page, testInfo, 'women-page')
    }
  })
})
