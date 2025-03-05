import { expect, test } from '@playwright/test'

test.describe('menTopsDisplayMode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test('Checking that the grid is selected and has 12 positions by defaultBottoms', async ({ page }) => {
    await page.locator('#ui-id-5').hover()
    await page.locator('#ui-id-18').click()

    await expect.soft(page.locator('strong[title="Grid"]').first()).toHaveClass(/active/)
    await expect.soft(page.locator('li[class = "item product product-item"]')).toHaveCount(12)
    await expect.soft(page.locator('#maincontent').getByRole('paragraph')).toHaveText('Items 1-12 of 24')
  })
  test('Checking that the list is selected and has 10 positions by defaultBottoms', async ({ page }) => {
    await page.locator('#ui-id-5').hover()
    await page.locator('#ui-id-18').click()
    const listLocator = page.locator('a[class="modes-mode mode-list"]').first()
    await page.waitForTimeout(2000) // добавил небольшую задержку
    await listLocator.click()

    await expect.soft(page.locator('strong[title="List"]').first()).toHaveClass(/active/)
    await expect.soft(page.locator('li[class = "item product product-item"]')).toHaveCount(10)
    await expect.soft(page.locator('#maincontent').getByRole('paragraph')).toHaveText('Items 1-10 of 24')
  })
})
