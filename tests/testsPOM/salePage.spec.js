import {
  BASE_URL,
  LIST_OF_ITEMS_IN_MENS_DEALS_ON_SALE_PAGE,
  LIST_OF_TITLES_FOR_PAGES_FROM_MENS_DEALS,
  LIST_OF_URLS_MENS_DEALS_END_POINT,
  SALE_PAGE_END_POINT,
  SALE_SIDE_MENU_SECTIONS,
  WOMEN_SHORTS_PAGE_END_POINT
} from '@helpers/data/testData.js'
import { saleDealsCategories } from '@helpers/data/testSaleData.js'
import { expect, test } from '@pages/base.js'
import SalePage from '@pages/salePage.js'
test.describe('salePage.spec', () => {
  test('Verify visibility of sections with discounted items on Sale page', async ({ homePage, page }) => {
    const salePage = new SalePage(page)
    await homePage.clickSaleLink()
    expect.soft(await salePage.obtainSideMenuSectionsText()).toEqual(SALE_SIDE_MENU_SECTIONS)
  })

  LIST_OF_ITEMS_IN_MENS_DEALS_ON_SALE_PAGE.forEach((option, ind) => {
    test(`Check that ${option} link opens the corresponding page`, async ({ homePage, page }) => {
      const salePage = new SalePage(page)
      await homePage.clickSaleLink()
      await salePage.clickOnItemsFromMensDealsSection(LIST_OF_ITEMS_IN_MENS_DEALS_ON_SALE_PAGE[ind])
      await expect.soft(page).toHaveURL(LIST_OF_URLS_MENS_DEALS_END_POINT[ind])

      const expectedTitle = LIST_OF_TITLES_FOR_PAGES_FROM_MENS_DEALS[ind]
      const actualTitle = await salePage.locators.getTitleForEachPageFromMensDeals()

      await expect.soft(actualTitle).toHaveText(expectedTitle)
    })
  })

  test('Check navigation and deal section to the Sale page', async ({ homePage, page }) => {
    const salePage = await homePage.clickSaleLink()
    await expect.soft(page).toHaveURL(BASE_URL + SALE_PAGE_END_POINT)
    const dealsTextArray = await salePage.locators.getDealsLocator().allTextContents()
    expect.soft(dealsTextArray).toEqual(saleDealsCategories)
  })

  test('redirect to Women Bottoms Shorts', async ({ homePage, page }) => {
    const salePage = await homePage.clickSaleLink()
    await salePage.clickWomensShortsLink()
    await expect.soft(page).toHaveURL(BASE_URL + WOMEN_SHORTS_PAGE_END_POINT)
  })
})
