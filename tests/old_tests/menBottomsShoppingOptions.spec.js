import { expect, test } from '@playwright/test'

test.describe('MenBottomsShoppingOptions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('verify the user is on Men Bottoms page', async ({ page }) => {
    await page.locator('#ui-id-5').hover()
    await page.locator('#ui-id-18').click()

    await expect.soft(page).toHaveURL('https://magento.softwaretestingboard.com/men/bottoms-men.html')
  })

  test('verify the sidebar is on the left', async ({ page }) => {
    await page.locator('#ui-id-5').hover()
    await page.locator('#ui-id-18').click()

    await expect.soft(page.getByRole('heading', { name: 'Shopping Options' })).toBeVisible()

    const sidebarLeft = await page.$eval('.sidebar.sidebar-main', sidebar => window.getComputedStyle(sidebar).float)

    expect.soft(sidebarLeft).toBe('left')
  })
})
