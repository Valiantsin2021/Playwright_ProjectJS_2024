import { expect, test } from '@playwright/test'
import * as TEST_DATA from '../../helpers/testData.js'
import * as TEST_MEN_DATA from '../../helpers/testMenData.js'
import HomePage from '../../page_objects/homePage.js'
let homePage
test.describe('menPage.spec', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.open()
  })

  test('Menu/Men available to click, see clothes only for men', async ({ page }) => {
    const menPage = await homePage.clickMenLink()

    await expect.soft(page).toHaveURL(TEST_DATA.BASE_URL + TEST_MEN_DATA.MEN_PAGE_END_POINT)
    await expect.soft(menPage.locators.getMenPageHeader()).toContainText(TEST_MEN_DATA.MEN_PAGE_HEADER)
    await expect.soft(menPage.locators.getCompareProducts()).toBeVisible(TEST_MEN_DATA.COMPARE_PRODUCTS_TEXT)
    await expect.soft(menPage.locators.getMyWishList()).toBeVisible(TEST_MEN_DATA.MY_WISH_LIST_TEXT)
  })

  test('Men page contains Shop by category block which is located on the left side of the page', async ({ page }) => {
    const menPage = await homePage.clickMenLink()

    await expect.soft(menPage.locators.getShopByCategoryBlock()).toBeVisible()
    await expect.soft(menPage.locators.getShopByCategoryBlock()).toHaveCSS('float', TEST_DATA.MEN_PAGE_SHOP_BY_CATEGORY_BLOCK_ALIGNMENT)
  })

  test('Category block contains sub-categories: Tops and Bottoms which are links in blue text', async ({ page }) => {
    const menPage = await homePage.clickMenLink()

    await expect.soft(menPage.locators.getTopsSubCategoryLink()).toHaveCSS('color', TEST_DATA.MEN_PAGE_TOPS_SUB_CATEGORY_LINK_COLOR)
    await expect.soft(menPage.locators.getBottomsSubCategoryLink()).toHaveCSS('color', TEST_DATA.MEN_PAGE_BOTTOMS_SUB_CATEGORY_LINK_COLOR)
  })

  test('Tops and Bottoms sub-categories have a counter for items from the right side of the relevant link', async ({ page }) => {
    const menPage = await homePage.clickMenLink()
    const subCaregoriesInCategoryBlock = menPage.locators.getSubCaregoriesInCategoryBlock()

    await expect.soft(menPage.locators.getTopsSubCategoryLink()).toBeVisible()
    await expect.soft(menPage.locators.getBottomsSubCategoryLink()).toBeVisible()
    await expect.soft(subCaregoriesInCategoryBlock).toHaveCount(TEST_DATA.MEN_PAGE_SHOP_BY_CATEGORY_SUB_CATEGORIES_AMOUNT)

    for (let itx = 0; itx < (await subCaregoriesInCategoryBlock.count()); itx++) {
      let rowArrayValue = (await subCaregoriesInCategoryBlock.nth(itx).textContent()).trim().split('\n')
      expect.soft(rowArrayValue[0].match(TEST_DATA.MEN_PAGE_SHOP_BY_CATEGORY_SUB_CATEGORIES_VALUES_REGEX)).toBeTruthy()
      expect.soft(typeof parseInt(rowArrayValue[1])).toEqual(TEST_DATA.MEN_PAGE_SHOP_BY_CATEGORY_SUB_CATEGORIES_COUNTER_DATATYPE)
    }
  })

  TEST_MEN_DATA.HOT_SELLERS_NAME.forEach((productsName, idx) => {
    test(`Menu/Men/Hot Sellers Verify user can click on product's name and be redirected to the ${productsName} page`, async ({ page }) => {
      const menPage = await homePage.clickMenLink()
      const menHotSellersPage = await menPage.clickMenHotSellersName(productsName)

      await expect.soft(page).toHaveURL(new RegExp(TEST_MEN_DATA.HOT_SELLERS_ENDPOINT_URL[idx]))
      await expect.soft(menHotSellersPage.locators.getMenName(productsName)).toHaveText(TEST_MEN_DATA.HOT_SELLERS_NAME[idx])
    })
  })

  test('Verify redirection to Men-Bottoms page from Men page', async ({ page }) => {
    const menPage = await homePage.clickMenLink()

    await homePage.clickMenLink()
    const menBottomsPage = await menPage.clickBottomsSideMenuLink()

    await expect.soft(menBottomsPage.locators.getBottomsHeading()).toBeVisible()
    await expect.soft(page).toHaveURL(TEST_DATA.BASE_URL + TEST_DATA.MEN_BOTTOMS_PAGE_END_POINT)
  })

  for (const subCategory in TEST_DATA.MEN_PAGE_SUB_CATEGORY_ENDPOINT_URL) {
    test(`${subCategory} sub-category link led to the ${subCategory}-Men page`, async ({ page }) => {
      const subCategoryPageEndpointUrl = TEST_DATA.MEN_PAGE_SUB_CATEGORY_ENDPOINT_URL[subCategory]

      const menPage = await homePage.clickMenLink()

      await expect.soft(menPage.locators.getSubCategoryLink(subCategory)).toBeVisible()
      await menPage.clickSubCategoryLink(subCategory)

      await expect.soft(page).toHaveTitle(`${subCategory} - Men`)
      await expect.soft(page).toHaveURL(new RegExp(subCategoryPageEndpointUrl))
    })
  }
})
