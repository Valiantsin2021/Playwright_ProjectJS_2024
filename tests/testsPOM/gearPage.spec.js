import { expect, test } from '@playwright/test'
import GearPage from '../../page_objects/gearPage.js'
import HomePage from '../../page_objects/homePage.js'
let homePage
test.describe('gearPage.spec', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.open()
  })

  test('Verify that each sub-category link in filter “Shop By Category” to be blue.', async ({ page }) => {
    const gearPage = new GearPage(page)

    await homePage.clickGearMenuItem()
    const SubCategoryBagsColour = await gearPage.locators.getSubCategoryBags()
    const SubCategoryFitnessColour = await gearPage.locators.getSubCategoryFitness()
    const SubCategoryWatchesColour = await gearPage.locators.getSubCategoryWatches()

    await expect.soft(SubCategoryBagsColour).toHaveCSS('border-color', 'rgb(0, 107, 180)')
    await expect.soft(SubCategoryFitnessColour).toHaveCSS('border-color', 'rgb(0, 107, 180)')
    await expect.soft(SubCategoryWatchesColour).toHaveCSS('border-color', 'rgb(0, 107, 180)')
  })

  test('Verify that “Bags”, “Fitness equipment” and “Watches” to be placed under filter “Shop By Category” are clickable.', async ({ page }) => {
    const gearPage = new GearPage(page)

    await homePage.clickGearMenuItem()

    await gearPage.clickSubCategoryBags()
    const gearBagsText = page.locator(".base[data-ui-id='page-title-wrapper']")

    await expect.soft(gearBagsText).toBeVisible()

    await homePage.clickGearMenuItem()

    await gearPage.clickSubCategoryFitness()
    const gearFitnessText = page.locator(".base[data-ui-id='page-title-wrapper']")

    await expect.soft(gearFitnessText).toBeVisible()

    await homePage.clickGearMenuItem()

    await gearPage.clickSubCategoryWatches()
    const gearWatchesText = page.locator(".base[data-ui-id='page-title-wrapper']")

    await expect.soft(gearWatchesText).toBeVisible()
  })
})
