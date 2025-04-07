import { runAccessibilityCheck } from '@helpers/accessibilityChecker'
import { test } from '@pages/base.js'
const ENABLE_ACCESSIBILITY_CHECKS = process.env.ENABLE_ACCESSIBILITY_CHECKS === 'true'

test.describe('Home page', () => {
  test('Does not have accessibility violations', async ({ homePage }, testInfo) => {
    if (ENABLE_ACCESSIBILITY_CHECKS) {
      await runAccessibilityCheck(homePage.page, testInfo, 'home-page')
    }
  })
})
