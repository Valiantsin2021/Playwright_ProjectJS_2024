import { expect, test } from '@pages/base.js'
import GearPage from '@pages/gearPage.js'

test.describe('gearPage.spec', () => {
  test('Verify that each sub-category link in filter “Shop By Category” to be blue.', async ({ homePage, page }) => {
    const gearPage = new GearPage(page)

    await homePage.clickGearMenuItem()
    const SubCategoryBagsColour = await gearPage.locators.getSubCategoryBags()
    const SubCategoryFitnessColour = await gearPage.locators.getSubCategoryFitness()
    const SubCategoryWatchesColour = await gearPage.locators.getSubCategoryWatches()

    await expect.soft(SubCategoryBagsColour).toHaveCSS('border-color', 'rgb(0, 107, 180)')
    await expect.soft(SubCategoryFitnessColour).toHaveCSS('border-color', 'rgb(0, 107, 180)')
    await expect.soft(SubCategoryWatchesColour).toHaveCSS('border-color', 'rgb(0, 107, 180)')
  })

  test('Verify that “Bags”, “Fitness equipment” and “Watches” to be placed under filter “Shop By Category” are clickable.', async ({ homePage, page }) => {
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
  test(`Verify gearPage match aria snapshot`, { tag: '@aria' }, async ({ homePage, page }) => {
    const gearPage = new GearPage(page)
    await homePage.clickGearMenuItem()
    await expect.soft(gearPage.page.getByRole('main')).toMatchAriaSnapshot({ name: 'gearPage.yml' })
  })
})
