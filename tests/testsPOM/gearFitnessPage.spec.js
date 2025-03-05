import { expect, test } from '@playwright/test'
import { BASE_URL, GEAR_FITNESS_NUMBER_ITEMS_IN_GRID_MODE, GEAR_FITNESS_NUMBER_ITEMS_IN_LIST_MODE, GEAR_FITNESS_PAGE_END_POINT, SORTED_LIST_FITNESS_PAGE_ENDPOINT } from '../../helpers/testData.js'
import HomePage from '@pages/homePage.js'
let homePage
test.describe('gearFitnessPage.spec', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.open()
  })

  test('verify navigation path to the fitness equipment page', async ({ page }) => {
    await homePage.hoverGearMenuItem()
    const gearFitnessPage = await homePage.clickGearFitnessEquipmentSubmenuItem()

    await expect.soft(gearFitnessPage.locators.getGearFitnessEquipmentBreadcrumbsLocator()).toHaveText('Home Gear Fitness Equipment')
  })

  test('change display mode in the Fitness Equipment section', async ({ page }) => {
    await homePage.hoverGearMenuItem()
    const gearFitnessPage = await homePage.clickGearFitnessEquipmentSubmenuItem()
    await page.waitForLoadState('load')

    await expect.soft(page).toHaveURL(BASE_URL + GEAR_FITNESS_PAGE_END_POINT)
    await expect.soft(gearFitnessPage.locators.getGearFitnessListModeLocator()).toBeVisible()
    await expect.soft(gearFitnessPage.locators.getGearFitnessAmountOfItemsLocator()).toHaveText(GEAR_FITNESS_NUMBER_ITEMS_IN_GRID_MODE)

    await gearFitnessPage.hoverGearFitnessListMode()
    await gearFitnessPage.clickGearFitnessListMode()
    await page.waitForLoadState('load')

    await expect.soft(page).toHaveURL(BASE_URL + SORTED_LIST_FITNESS_PAGE_ENDPOINT)
    await expect.soft(gearFitnessPage.locators.getGearFitnessGridModeLocator()).toBeVisible()
    await expect.soft(gearFitnessPage.locators.getGearFitnessAmountOfItemsLocator()).toHaveText(GEAR_FITNESS_NUMBER_ITEMS_IN_LIST_MODE)
  })
})
