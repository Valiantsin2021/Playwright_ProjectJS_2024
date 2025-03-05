import { expect, test } from '@playwright/test'
import { LOGO_ALIGNMENT, MY_ACCOUNT_CREATE_END_POINT, NAVBAR_URLs_END_POINTS } from '@helpers/testData.js'
import HomePage from '@pages/homePage.js'
import Logo from '@pages/logo'

test.describe('logo.spec', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.open()
  })

  test('Verify Logo picture is located from the left in all pages of site', async ({ page }) => {
    const logo = new Logo(page)
    const allLinksWithLogo = NAVBAR_URLs_END_POINTS
    allLinksWithLogo.push(MY_ACCOUNT_CREATE_END_POINT)

    for (let link of allLinksWithLogo) {
      await logo.locators.getLogo(link)

      await expect.soft(logo.locators.getLogo()).toBeVisible()
      await expect.soft(logo.locators.getLogo()).toHaveCSS('float', LOGO_ALIGNMENT)
    }
  })
})
