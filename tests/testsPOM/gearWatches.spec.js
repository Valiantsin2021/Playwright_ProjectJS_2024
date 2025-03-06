import { expect, test } from '@playwright/test'
import {
  LIST_OF_CATEGORY_WATCHES,
  LIST_OF_MATERIALS_SUBITEMS_EXPECTED,
  LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE,
  LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE_LOCATORS,
  LIST_OF_SUBMENU_ITEMS_EXPECTED
} from '@helpers/testData.js'
import GearWatchesPage from '@pages/gearWatchesPage.js'
import HomePage from '@pages/homePage.js'
import WatchProductPage from '@pages/watchProductPage.js'

test.describe('gearWatchesPage', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.open()
    await homePage.hoverGearMenuItem()
    await homePage.clickGearWatchesSubmenuItem()
  })

  LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE.forEach((option, idx) => {
    test.skip(`Verify the "Clear All" button after applying ${option} filters on the Gear/Watches page`, async ({ page }) => {
      test.slow()
      const gearWatchesPage = new GearWatchesPage(page)

      if (LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE[idx] === 'GENDER') {
        return
      } else {
        await gearWatchesPage.clickShoppingOption(option)
        await gearWatchesPage.locators.getWaitForListOfShoppingOptions(option, idx)

        const LIST_OF_SUBMENU_ITEMS_ACTUAL = await gearWatchesPage.locators.getArrayOfShoppingOptions(option, idx)

        const LIST_OF_SUBMENU_ITEMS_SPLITTED_ACTUAL = LIST_OF_SUBMENU_ITEMS_ACTUAL.map(item => item.split(/\s\d+/)[0])

        for (let i = 0; i < LIST_OF_SUBMENU_ITEMS_SPLITTED_ACTUAL.length; i++) {
          await gearWatchesPage.clickSubMenuLink(LIST_OF_SUBMENU_ITEMS_SPLITTED_ACTUAL[i])

          await expect.soft(gearWatchesPage.locators.getNowShoppingBySubtitle()).toBeVisible()
          await gearWatchesPage.clickClearAllButton()
          await expect.soft(gearWatchesPage.locators.getNowShoppingBySubtitle()).not.toBeVisible()

          await gearWatchesPage.clickShoppingOption(option)
        }
      }
    })
  })

  LIST_OF_MATERIALS_SUBITEMS_EXPECTED.forEach(material => {
    test(`Verify the related products are displayed after applying ${material} Material filter on the Gear/Watches page`, async ({ page }) => {
      test.slow()
      const gearWatchesPage = new GearWatchesPage(page)
      const watchProductPage = new WatchProductPage(page)

      await gearWatchesPage.clickShoppingOption(LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE[3])
      await gearWatchesPage.clickSubMenuLink(material)

      const arrayOfProducts = await gearWatchesPage.locators.getAllProducts().allInnerTexts()

      for (let product of arrayOfProducts) {
        await gearWatchesPage.openProductPage(product)
        await watchProductPage.openMoreInformationSection()

        await expect.soft(watchProductPage.locators.getMoreInformationSectionContent()).toContainText(material)
        await watchProductPage.goBackToGearWatchesPage()
      }
    })
  })

  test('Verify that the filter is applied after selecting an option in the Material dropdown list on the Gear/Watches page', async ({ page }) => {
    test.slow()
    const gearWatchesPage = new GearWatchesPage(page)

    await gearWatchesPage.clickShoppingOption(LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE[3])
    await gearWatchesPage.locators.getWaitForListOfShoppingOptions(LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE[3], 3)

    const LIST_OF_SUBMENU_ITEMS_ACTUAL = await page.locator(LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE_LOCATORS[3]).allInnerTexts()

    const LIST_OF_SUBMENU_ITEMS_SPLITTED_ACTUAL = LIST_OF_SUBMENU_ITEMS_ACTUAL.map(item => item.split(/\s\d+/)[0])

    for (const material of LIST_OF_SUBMENU_ITEMS_SPLITTED_ACTUAL) {
      await gearWatchesPage.clickSubMenuLink(material)
      await expect.soft(gearWatchesPage.locators.getNowShoppingBySubtitle()).toBeVisible()
      await expect.soft(gearWatchesPage.locators.getFilterValue()).toHaveText(material)

      await gearWatchesPage.clickClearAllButton()
      await gearWatchesPage.clickShoppingOption(LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE[3])
    }
  })

  test.skip('Verify the Shopping options dropdown list items on the Gear/Watches page', async ({ page }) => {
    test.slow()
    const gearWatchesPage = new GearWatchesPage(page)

    for (let i = 0; i < LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE.length; i++) {
      await gearWatchesPage.clickShoppingOption(LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE[i])
      await gearWatchesPage.locators.getWaitForListOfShoppingOptions(LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE[i], i)

      const LIST_OF_SUBMENU_ITEMS_ACTUAL = await page.locator(LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE_LOCATORS[i]).allInnerTexts()
      const LIST_OF_SUBMENU_ITEMS_SPLITTED_ACTUAL = LIST_OF_SUBMENU_ITEMS_ACTUAL.map(item => item.split(/\s\d+/)[0])

      expect.soft(LIST_OF_SUBMENU_ITEMS_SPLITTED_ACTUAL).toEqual(LIST_OF_SUBMENU_ITEMS_EXPECTED[i])
    }
  })

  test('Filter Products By ActivityType on gearWatchesPage', async ({ page }) => {
    test.slow()
    const gearWatchesPage = new GearWatchesPage(page)

    await gearWatchesPage.clickShoppingOption(LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE[2])

    for (let i = 0; i < LIST_OF_SUBMENU_ITEMS_EXPECTED[2].length; i++) {
      await gearWatchesPage.clickSubMenuLink(LIST_OF_SUBMENU_ITEMS_EXPECTED[2][i])
      await expect.soft(gearWatchesPage.locators.getFilterValue()).toHaveText(LIST_OF_SUBMENU_ITEMS_EXPECTED[2][i])
      await gearWatchesPage.clickClearAllButton()
      await gearWatchesPage.clickShoppingOption(LIST_OF_SHOPPING_OPTIONS_ON_WATCHES_PAGE[2])
    }
  })
  test('Verify only watches on sale displayed on page', async ({ page }) => {
    const gearWatchesPage = new GearWatchesPage(page)
    await gearWatchesPage.clickSaleOption()
    const watchProductPage = await gearWatchesPage.clickYesOption()
    expect.soft(watchProductPage.locators.getSaleItemsNumber()).toEqual(watchProductPage.locators.getSaleItemsNumber())
  })
  LIST_OF_CATEGORY_WATCHES.forEach((category, idx) => {
    test.fixme(`Verify Category options ${category} on gearWatchesPage`, async ({ page }) => {
      test.slow()
      const gearWatchesPage = new GearWatchesPage(page)

      await gearWatchesPage.clickCategory()

      const List = await gearWatchesPage.locators.getCategoryOptions().nth(idx)
      const ListText = await gearWatchesPage.getOptionsText(idx)

      await expect.soft(List).toBeVisible()
      expect.soft(ListText).toEqual(LIST_OF_CATEGORY_WATCHES[idx])
    })
  })
})
