import { expect, test } from '@playwright/test'

test.describe('menu women shop by category', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/women.html')
  })

  test('verify filter on page Women has title “Shop By Category', async ({ page }) => {
    const titleShopBy = page.getByText('Shop By')
    const categoryTitle = page.getByText('Category')

    await expect.soft(titleShopBy).toBeVisible()
    await expect.soft(titleShopBy).toHaveCSS('color', 'rgb(51, 51, 51)')
    await expect.soft(categoryTitle).toBeVisible()
    await expect.soft(categoryTitle).toHaveCSS('color', 'rgb(51, 51, 51)')
  })
})
