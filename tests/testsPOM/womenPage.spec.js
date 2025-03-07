import { BASE_URL, BOTTOMS_WOMEN_PAGE_END_POINT, TEES_WOMEN_PAGE_END_POINT, TOPS_WOMEN_PAGE_END_POINT, WOMEN_BOTTOMS_HEADER, WOMEN_TOPS_HEADER } from '@helpers/data/testData.js'
import { expect, test } from '@pages/base.js'
import BottomsWomenPage from '@pages/bottomsWomenPage.js'
import TopsWomenPage from '@pages/topsWomenPage.js'
import WomenPage from '@pages/womenPage.js'

test.describe('womenPage.spec', () => {
  test("Navigate to Women's Tees page by clicking Promo link on 'Women' page", async ({ homePage, page }) => {
    const womenPage = new WomenPage(page)
    await homePage.clickWomenLink()
    await womenPage.clickWomenTeesLink()

    await expect.soft(page).toHaveURL(BASE_URL + TEES_WOMEN_PAGE_END_POINT)
  })
  test('Links with category names are located on the page, clickable, and blue', async ({ homePage, page }) => {
    const womenPage = new WomenPage(page)
    const topsWomenPage = new TopsWomenPage(page)
    const bottomsWomenPage = new BottomsWomenPage(page)
    await homePage.clickWomenLink()

    await expect.soft(womenPage.locators.getWomenTopsLink()).toHaveCSS('color', 'rgb(0, 107, 180)')

    await womenPage.clickWomenTopsLink()
    await expect.soft(page).toHaveURL(BASE_URL + TOPS_WOMEN_PAGE_END_POINT)
    await expect.soft(topsWomenPage.locators.getWomenTopsPageHeader()).toHaveText(WOMEN_TOPS_HEADER)

    await homePage.clickWomenLink()

    await expect.soft(womenPage.locators.getWomenBottomsLink()).toHaveCSS('color', 'rgb(0, 107, 180)')

    await womenPage.clickWomenBottomsLink()

    await expect.soft(page).toHaveURL(BASE_URL + BOTTOMS_WOMEN_PAGE_END_POINT)
    await expect.soft(bottomsWomenPage.locators.getWomenBottomsPageHeader()).toHaveText(WOMEN_BOTTOMS_HEADER)
  })
})
