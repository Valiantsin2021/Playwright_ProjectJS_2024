import { expect, test } from '@playwright/test'

test.describe('page gear', () => {
  const FITNESS_ITEMS = [
    'Sprite Yoga Companion Kit',
    'Set of Sprite Yoga Straps',
    'Harmony Lumaflex™ Strength Band Kit',
    'Sprite Foam Roller',
    'Sprite Foam Yoga Brick',
    'Quest Lumaflex™ Band',
    "Go-Get'r Pushup Grips",
    'Pursuit Lumaflex™ Tone Band',
    'Zing Jump Rope',
    'Dual Handle Cardio Ball',
    'Affirm Water Bottle'
  ]

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to fitness equipment page', async ({ page }) => {
    const gearPageURL = 'https://magento.softwaretestingboard.com/gear.html'

    await page.goto(gearPageURL)
    await expect.soft(page).toHaveURL(gearPageURL)

    await page.locator('#narrow-by-list2 > dd > ol > li:nth-child(2) > a').click()
    await expect.soft(page).toHaveURL('https://magento.softwaretestingboard.com/gear/fitness-equipment.html')
  })

  test('verify that on the Fitness Equipment page user sees fitness equipment', async ({ page }) => {
    await page.getByRole('menuitem', { name: 'Gear' }).hover()
    await page.locator('#ui-id-26').click()

    const allFitnessItems = await page.locator('.products .product-items .product-item-link').allTextContents()

    expect.soft(allFitnessItems.length).toBeGreaterThan(0)

    const allItemsContainExpectedText = allFitnessItems.every(item => FITNESS_ITEMS.some(keyword => item.includes(keyword)))

    expect.soft(allItemsContainExpectedText).toBeTruthy()
  })
})
