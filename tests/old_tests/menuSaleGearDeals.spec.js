import { expect, test } from '@playwright/test'
test.describe('menuSaleGear_Deals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sale.html')
  })

  test('Title “Gears deals” are located under “Mens deals” section', async ({ page }) => {
    const menDealsTitleElement = page.locator('.categories-menu > strong:nth-child(3) > span')
    const gearDealsTitleElement = page.locator('.categories-menu > strong:nth-child(5) > span')

    await expect.soft(menDealsTitleElement).toHaveText("Mens's Deals")
    await expect.soft(gearDealsTitleElement).toHaveText('Gear Deals')
  })

  test('List of links with title “Gears deal” is on the left side', async ({ page }) => {
    const itemsGearDeals = page.locator('.sidebar-main>.block-static-block.widget>.categories-menu>ul.items:last-child>li')
    const GearDeals = page.locator('.categories-menu > strong:nth-child(5) > span')

    await expect.soft(itemsGearDeals).toHaveText(['Bags', 'Fitness Equipment'])
    await expect.soft(GearDeals).toHaveText(['Gear Deals'])
    await expect.soft(page.locator('.sidebar-main')).toHaveCSS('float', 'left')
  })
})
