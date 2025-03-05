import { expect, test } from '@playwright/test'
import { BASE_URL, ID_PARAMETERS_OF_SUB_CATEGORY_ON_MEN_BOTTOMS_PAGE, LIST_CATEGORY_MEN_BOTTOMS, LIST_CATEGORY_MEN_BOTTOMS_WITH_QUANTITY, MEN_BOTTOMS_PAGE_END_POINT } from '@helpers/testData.js'
import HomePage from '@pages/homePage.js'
let homePage
test.describe('menBottomsPage.spec', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)

    await homePage.open()
  })

  test("Verify men's bottom tab", async ({ page }) => {
    await homePage.hoverMenLink()
    const menBottomsPage = await homePage.clickMenBottomsLink()

    await expect.soft(page).toHaveURL(BASE_URL + MEN_BOTTOMS_PAGE_END_POINT)
    await expect.soft(menBottomsPage.locators.getBottomsHeading()).toBeVisible()
  })

  test('verify the sidebar is on the left', async ({ page }) => {
    await homePage.hoverMenLink()
    const menBottomsPage = await homePage.clickMenBottomsLink()

    await expect.soft(menBottomsPage.locators.getMenBottomsShopingOptionsSidebarTitle()).toBeVisible()

    const positionOfSidebar = await menBottomsPage.getPositionOfSidebar()

    expect.soft(positionOfSidebar).toBe('left')
  })

  LIST_CATEGORY_MEN_BOTTOMS.forEach((name, i) => {
    test(`verify the user can select ${name} subcategory from the dropdown`, async ({ page }) => {
      await homePage.hoverMenLink()
      const menBottomsPage = await homePage.clickMenBottomsLink()

      await expect.soft(page).toHaveURL(BASE_URL + MEN_BOTTOMS_PAGE_END_POINT)

      await menBottomsPage.waitForTimeout(3000)
      await menBottomsPage.hoverMenBottomsCategory()
      await menBottomsPage.clickMenBottomsCategory()
      await page.waitForLoadState('load')
      await menBottomsPage.hoverMenBottomsSubCategory(i)
      await menBottomsPage.clickMenBottomsSubCategory(i)

      await expect.soft(menBottomsPage.locators.getMenBottomsCategoryValue(i)).toContainText(LIST_CATEGORY_MEN_BOTTOMS[i])
      await expect.soft(page).toHaveURL(BASE_URL + MEN_BOTTOMS_PAGE_END_POINT + ID_PARAMETERS_OF_SUB_CATEGORY_ON_MEN_BOTTOMS_PAGE[i])

      await menBottomsPage.clickMenBottomsClearCategoryFilter()
    })
  })

  test('Checking that the grid is selected and has 12 positions by defaultBottoms', async ({ page }) => {
    await homePage.hoverMenLink()
    const menBottomsPage = await homePage.clickMenBottomsLink()

    await expect.soft(menBottomsPage.locators.getMenBottomsFilterGrid()).toHaveClass(/active/)
    await expect.soft(menBottomsPage.locators.getMenBottomsDefault12ItemCard()).toHaveCount(12)
    await expect.soft(menBottomsPage.locators.getMenBottomsParagraphFilterGridText()).toHaveText('Items 1-12 of 24')
  })
  test('Checking that the list is selected and has 10 positions by defaultBottoms', async ({ page }) => {
    await homePage.hoverMenLink()
    const menBottomsPage = await homePage.clickMenBottomsLink()
    await menBottomsPage.waitForTimeout(2000)
    await menBottomsPage.clickMenBottomsFilterList()

    await expect.soft(menBottomsPage.locators.getMenBottomsDefault10ItemCardList()).toHaveCount(10)
    await expect.soft(menBottomsPage.locators.getMenBottomsParagraphFilterListText()).toHaveText('Items 1-10 of 24')
    await expect.soft(menBottomsPage.locators.getMenBottomsFilterList()).toHaveClass(/active/)
  })

  test('verify that the quantity of available items is visible', async ({ page }) => {
    await homePage.hoverMenLink()
    const menBottomsPage = await homePage.clickMenBottomsLink()

    await expect.soft(page).toHaveURL(BASE_URL + MEN_BOTTOMS_PAGE_END_POINT)
    await page.waitForLoadState('load')

    await menBottomsPage.hoverMenBottomsCategory()
    await menBottomsPage.clickMenBottomsCategory()
    await menBottomsPage.waitForTimeout(5000)

    await expect.soft(menBottomsPage.locators.getMenBottomsCategoryListOfItemsLocator().first()).toBeVisible()

    const receivedElements = (await menBottomsPage.locators.getMenBottomsCategoryListOfItemsLocator().allInnerTexts()).map(item => item.replace('\n', ' '))

    expect.soft(LIST_CATEGORY_MEN_BOTTOMS_WITH_QUANTITY).toEqual(receivedElements)
  })

  test('Verify that button Clear All can deselecte options', async ({ page }) => {
    await homePage.hoverMenLink()
    const menBottomsPage = await homePage.clickMenBottomsLink()

    await menBottomsPage.clickMenBottomsCategory()
    await menBottomsPage.clickMenBottomsCategoryPants()

    const listOfSelectedItems = page.locator('.filter-current')
    await menBottomsPage.clickMenBottomsClearAllButton()

    await expect.soft(listOfSelectedItems).not.toBeVisible()
  })
})
