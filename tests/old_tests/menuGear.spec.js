import { expect, test } from '@playwright/test'

test.describe('menuGear', () => {
  const BASE_URL = 'https://magento.softwaretestingboard.com'
  const gearMenuItems = {
    Bags: '/gear/bags.html',
    'Fitness Equipment': '/gear/fitness-equipment.html',
    Watches: '/gear/watches.html'
  }
  const expectedItems = ['Bags', 'Fitness Equipment', 'Watches']

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    if (await page.getByRole('dialog', { name: 'This site asks for consent to use your data' }).isVisible()) {
      await page.getByRole('button', { name: 'Consent' }).click()
    }
  })

  test('Gear drop-down menu contains: Bags, Fitness equipment, Watches items', async ({ page }) => {
    const gearSubMenu = page.locator('.nav-4.level0 ul')

    const actualSubMenuItems = await gearSubMenu.locator('li').allTextContents()

    await page.getByRole('menuitem', { name: 'Gear' }).hover()

    await expect.soft(gearSubMenu).toBeVisible()
    expect.soft(expectedItems).toEqual(actualSubMenuItems)
  })

  for (const gearMenuItem in gearMenuItems) {
    test(`User could navigate from the Gear drop-down menu to ${gearMenuItem} page`, async ({ page }) => {
      const menuItem = page.getByRole('menuitem', { name: gearMenuItem })
      const menuPageUrl = gearMenuItems[gearMenuItem]

      await page.getByRole('menuitem', { name: 'Gear' }).hover()

      await expect.soft(menuItem).toBeVisible()

      menuItem.click()

      await expect.soft(page).toHaveURL(BASE_URL + menuPageUrl)
      await expect.soft(page).toHaveTitle(`${gearMenuItem} - Gear`)
      await expect.soft(page.getByRole('heading', { name: gearMenuItem })).toBeVisible()
    })
  }

  test('User could navigate from the Gear menu to the Gear page', async ({ page }) => {
    await page.getByRole('menuitem', { name: 'Gear' }).click()

    const gearPageUrl = '/gear.html'

    await expect.soft(page).toHaveURL(BASE_URL + gearPageUrl)
    await expect.soft(page).toHaveTitle('Gear')
  })

  test('User able to see fitness equipment, bags, and watches when navigating from the Gear menu to the Gear page', async ({ page }) => {
    await page.getByRole('menuitem', { name: 'Gear' }).click()

    const gearPageUrl = '/gear.html'
    await expect.soft(page).toHaveURL(BASE_URL + gearPageUrl)
    await expect.soft(page).toHaveTitle('Gear')

    const actualItemsCategories = await page.locator('ol.items li a').allTextContents()
    const actualItemsLinks = await page.locator('.categories-menu ul li a').allTextContents()

    expect.soft(actualItemsCategories).toEqual(expectedItems)
    expect.soft(actualItemsLinks).toEqual(expectedItems)
  })
})
