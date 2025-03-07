import { BASE_URL, WOMEN_TOPS_PAGE_END_POINT, WOMEN_TOPS_STYLE_CATEGORIES } from '@helpers/data/testWomenData.js'
import { expect, test } from '@pages/base.js'
import WomenTopsPage from '@pages/womenTopsPage.js'

test.describe('womenTopsPage.spec', () => {
  test('Verify visability of Shopping Option in the menu on the left side', async ({ homePage, page }) => {
    const womenTopsPage = new WomenTopsPage(page)

    await homePage.open()
    await homePage.hoverWomenLink()
    await homePage.clickWomenTopsLink()
    await womenTopsPage.clickShoppingOptionsHeading()

    await expect.soft(womenTopsPage.locators.getShoppingOptionsHeading()).toBeVisible()
  })
  test('Verify dropdown menu has 19 Options', async ({ homePage, page }) => {
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
