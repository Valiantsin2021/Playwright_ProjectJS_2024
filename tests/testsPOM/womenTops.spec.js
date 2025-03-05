import { expect, test } from '@playwright/test'
import { BASE_URL, WOMEN_TOPS_PAGE_END_POINT, WOMEN_TOPS_STYLE_CATEGORIES } from '../../helpers/testWomenData.js'
import HomePage from '../../page_objects/homePage.js'
import WomenTopsPage from '../../page_objects/womenTopsPage.js'

test.describe('womenTopsPage.spec', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.open()
  })
  test('Verify visability of Shopping Option in the menu on the left side', async ({ page }) => {
    const homePage = new HomePage(page)
    const womenTopsPage = new WomenTopsPage(page)

    await homePage.open()
    await homePage.hoverWomenLink()
    await homePage.clickWomenTopsLink()
    await womenTopsPage.clickShoppingOptionsHeading()

    await expect.soft(womenTopsPage.locators.getShoppingOptionsHeading()).toBeVisible()
  })
  test('Verify dropdown menu has 19 Options', async ({ page }) => {
    const homePage = new HomePage(page)
    const womenTopsPage = new WomenTopsPage(page)

    await homePage.open()
    await homePage.hoverWomenLink()
    await homePage.clickWomenTopsLink()
    await womenTopsPage.clickStyleDropDownMenu()
    for (let index = 0; index < WOMEN_TOPS_STYLE_CATEGORIES.length; index++) {
      await expect.soft(womenTopsPage.locators.getStyleList().nth(index)).toContainText(WOMEN_TOPS_STYLE_CATEGORIES[index])
    }
    await expect.soft(page).toHaveURL(BASE_URL + WOMEN_TOPS_PAGE_END_POINT)
  })
})
