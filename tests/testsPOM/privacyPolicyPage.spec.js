import { NAV_MENU_ITEM_NAMES, NUMBER_NAV_MENU_ITEMS } from '@helpers/testPrivacyPolicyData'
import { expect, test } from '@playwright/test'
import Footer from '@pages/footer'
import HomePage from '@pages/homePage'
import PrivacyPolicyPage from '@pages/privacyPolicyPage'

test.describe('privacyPolicyPage.spec', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    const footer = new Footer(page)
    await homePage.open()
    await footer.clickPrivacyAndCookiePolicyLink()
  })

  test('Verify the navigation menu has 14 items, and they have correct names', async ({ page }) => {
    const privacyPolicyPage = new PrivacyPolicyPage(page)

    await expect.soft(privacyPolicyPage.locators.getNavMenuItemList()).toHaveCount(NUMBER_NAV_MENU_ITEMS)
    await expect.soft(privacyPolicyPage.locators.getNavMenuItemList()).toHaveText(NAV_MENU_ITEM_NAMES)
  })

  NAV_MENU_ITEM_NAMES.forEach((item, idx) => {
    test(`Verify ${item} header on the right side of the page matches navigation menu item`, async ({ page }) => {
      const privacyPolicyPage = new PrivacyPolicyPage(page)
      const header = await privacyPolicyPage.locators.getContentHeadersList().nth(idx).innerText()

      expect.soft(header).toEqual(NAV_MENU_ITEM_NAMES[idx])
    })
  })
})
