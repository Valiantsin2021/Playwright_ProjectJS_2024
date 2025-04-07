import { runAccessibilityCheck } from '@helpers/accessibilityChecker'
import { test } from '@pages/base.js'
const ENABLE_ACCESSIBILITY_CHECKS = process.env.ENABLE_ACCESSIBILITY_CHECKS === 'true'

test.describe('Men page', () => {
  test('Does not have accessibility violations', async ({ homePage }, testInfo) => {
    const menPage = await homePage.clickMenLink()
    if (ENABLE_ACCESSIBILITY_CHECKS) {
      await runAccessibilityCheck(menPage.page, testInfo, 'man-page')
    }
  })
})
