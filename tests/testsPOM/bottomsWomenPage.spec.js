import {
  BASE_URL,
  BOTTOMS_WOMEN_PAGE_END_POINT,
  EXPECTED_ITEM_STYLE_WOMEN_BOTTOMS,
  EXPECTED_NUMBER_PRODUCTS_STYLEs_BOTTOMS_WOMEN,
  PRODUCT_LIST,
  WOMEN_BOTTOMS_CATEGORIES_STYLEs_END_POINT
} from '@helpers/testData.js'
import { WOMEN_BOTTOMS_CATEGORIES, WOMEN_BOTTOMS_SIZE } from '@helpers/testWomenData.js'
import { expect, test } from '@pages/base.js'
test.describe('bottomsWomenPage >', () => {
  test('Verify the availability of a list of 9 category in the "Style" option drop-down list', async ({ homePage }) => {
    await homePage.hoverWomenMenuitem()
    const bottomsWomenPage = await homePage.clickBottomsWomenLink()

    await expect.soft(homePage.page).toHaveURL(BASE_URL + BOTTOMS_WOMEN_PAGE_END_POINT)

    await bottomsWomenPage.clickWomenBottomsOptionStyle()

    expect.soft(await bottomsWomenPage.locators.getAriaSelectedWomenBottoms()).toBeTruthy()

    const expectedItems = EXPECTED_ITEM_STYLE_WOMEN_BOTTOMS
    const receivedResult = await bottomsWomenPage.locators.getCategoryInStyle().allInnerTexts()
    const result = await bottomsWomenPage.extractAndCompareItems(receivedResult, expectedItems)

    expect.soft(result.extractedItems).toEqual(expectedItems)
  })

  test('Verify that each category displays the number of products', async ({ homePage }) => {
    await homePage.hoverWomenMenuitem()
    const bottomsWomenPage = await homePage.clickBottomsWomenLink()

    await expect.soft(homePage.page).toHaveURL(BASE_URL + BOTTOMS_WOMEN_PAGE_END_POINT)

    await bottomsWomenPage.clickWomenBottomsOptionStyle()

    expect.soft(await bottomsWomenPage.locators.getAriaSelectedWomenBottoms()).toBeTruthy()

    const categoriesStyle = await bottomsWomenPage.locators.getCategoriesStyle()
    for (const category of categoriesStyle) {
      const countItems = await bottomsWomenPage.locators.getCountItemsInCategoryStyle(category)

      expect.soft(countItems).toBeTruthy()
      expect.soft(await countItems.isVisible()).toBeTruthy()
      expect.soft(await countItems.textContent()).toMatch(/\d+/)
    }
  })

  EXPECTED_ITEM_STYLE_WOMEN_BOTTOMS.forEach(async (categoryName, index) => {
    test(`Verify navigating to "${categoryName}" page from "Style" option`, async ({ homePage }) => {
      await homePage.hoverWomenMenuitem()
      const bottomsWomenPage = await homePage.clickBottomsWomenLink()
      await bottomsWomenPage.clickWomenBottomsOptionStyle()
      await bottomsWomenPage.clickCategoryStyle(index)

      await expect.soft(homePage.page).toHaveURL(BASE_URL + WOMEN_BOTTOMS_CATEGORIES_STYLEs_END_POINT[index])
      await expect.soft(await bottomsWomenPage.locators.getSelectCategory()).toHaveText(categoryName)
    })
  })

  EXPECTED_ITEM_STYLE_WOMEN_BOTTOMS.forEach(async (nameCategory, index) => {
    test(`Ensure "${nameCategory}" category selected in the "Style" option aligns with the displayed category name on the page.`, async ({ homePage }) => {
      await homePage.hoverWomenMenuitem()
      const bottomsWomenPage = await homePage.clickBottomsWomenLink()
      await bottomsWomenPage.clickWomenBottomsOptionStyle()
      const category = await bottomsWomenPage.getObjectCategoryStyleByIndex(index)
      await bottomsWomenPage.clickCategoryStyle(index)

      await expect.soft(homePage.page).toHaveURL(BASE_URL + WOMEN_BOTTOMS_CATEGORIES_STYLEs_END_POINT[index])
      expect.soft(nameCategory).toEqual(await category.name)
      await expect.soft(await bottomsWomenPage.locators.getSelectCategory()).toHaveText(await category.name)
    })
  })

  EXPECTED_ITEM_STYLE_WOMEN_BOTTOMS.forEach(async (nameCategory, index) => {
    test(`Verify that the number of products displayed matches the count for the "${nameCategory}" category `, async ({ homePage }) => {
      await homePage.hoverWomenMenuitem()
      const bottomsWomenPage = await homePage.clickBottomsWomenLink()
      await bottomsWomenPage.clickWomenBottomsOptionStyle()
      const category = await bottomsWomenPage.getObjectCategoryStyleByIndex(index)
      await bottomsWomenPage.clickCategoryStyle(index)

      await expect.soft(await bottomsWomenPage.locators.getSelectCategory()).toHaveText(nameCategory)
      expect.soft(EXPECTED_NUMBER_PRODUCTS_STYLEs_BOTTOMS_WOMEN[index]).toEqual(category.count)
      expect.soft(await bottomsWomenPage.locators.getProductCards().count()).toEqual(category.count)
    })
  })

  test('User can able to select a category from the suggested list of 2 (two) options: Pants.', async ({ homePage }) => {
    await homePage.hoverWomenMenuitem()
    const bottomsWomenPage = await homePage.clickBottomsWomenLink()
    await bottomsWomenPage.clickWomenBottomsCategory()
    await bottomsWomenPage.clickBottomsCategoryPants()
    const actualPantsText = await bottomsWomenPage.getLocatorInnerText(bottomsWomenPage.locators.getPantsCategoryLocator())

    expect.soft(actualPantsText).toEqual(WOMEN_BOTTOMS_CATEGORIES[0])
  })

  test('User can able to select a category from the suggested list of 2 (two) options: Shorts', async ({ homePage }) => {
    await homePage.hoverWomenMenuitem()
    const bottomsWomenPage = await homePage.clickBottomsWomenLink()
    await bottomsWomenPage.clickWomenBottomsCategory()
    await bottomsWomenPage.clickBottomsCategoryShorts()
    const actualShortsText = await bottomsWomenPage.getLocatorInnerText(bottomsWomenPage.locators.getShortsCategoryLocator())

    expect.soft(actualShortsText).toEqual(WOMEN_BOTTOMS_CATEGORIES[1])
  })

  test('Women/Bottoms/Shopping options/Price filter is displayed', async ({ homePage }) => {
    await homePage.hoverWomenMenuitem()
    const bottomsWomenPage = await homePage.clickBottomsWomenLink()
    await bottomsWomenPage.clickOptionPrice()

    await expect.soft(bottomsWomenPage.locators.getOptionPriceFilter()).toBeVisible()
  })

  test('Verify a User can deselect all options at once', async ({ homePage }) => {
    const womenPage = await homePage.clickWomenLink()
    const bottomsWomenPage = await womenPage.clickWomenBottomsLinkFromShopByCategory()

    await bottomsWomenPage.clickShoppingOptionsMaterial()
    await bottomsWomenPage.clickShoppingOptionsMaterialOrganicCotton()
    await bottomsWomenPage.clickShoppingOptionsPrice()
    await bottomsWomenPage.clickShoppingOptionsPriceSecondSubCategory()

    const listOfSelectedItems = homePage.page.locator('.filter-current')
    await bottomsWomenPage.clickClearAllButton()

    await expect.soft(listOfSelectedItems).not.toBeVisible()
  })

  test('On the page Bottoms - Womens page there are 5 options for sizes 28, 29, 30, 31, 32.', async ({ homePage }) => {
    await homePage.hoverWomenMenuitem()
    const bottomsWomenPage = await homePage.clickBottomsWomenLink()
    await bottomsWomenPage.clickWomenBottomsOptionSize()
    for (let index = 0; index < WOMEN_BOTTOMS_SIZE.length; index++) {
      await expect.soft(bottomsWomenPage.locators.getWomenBottomsLocatorsSize().nth(index)).toHaveText(WOMEN_BOTTOMS_SIZE[index])
    }
    expect.soft(await bottomsWomenPage.locators.getWomenBottomsLocatorsSize().count()).toBe(5)
  })

  test('Product display mode change in the catalog to the List mode', async ({ homePage }) => {
    await homePage.hoverWomenMenuitem()
    const bottomsWomenPage = await homePage.clickBottomsWomenLink()
    await bottomsWomenPage.clickListViewLink()

    await expect.soft(bottomsWomenPage.locators.getProductsListWrapper()).toHaveClass(new RegExp(PRODUCT_LIST))
  })
})
