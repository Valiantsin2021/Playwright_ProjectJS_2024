import { expect, test } from '@playwright/test'
test.describe('Training/Video Download', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('subsection “Video Download” can be accessed through navigation menu "Training"', async ({ page }) => {
    await page.getByRole('menuitem', { name: 'Training' }).hover()
    await page.getByRole('menuitem', { name: 'Video Download' }).click()

    await expect.soft(page).toHaveURL('https://magento.softwaretestingboard.com/training/training-video.html')
    await expect.soft(page.locator('.page-title')).toHaveText('Video Download')
  })
})
