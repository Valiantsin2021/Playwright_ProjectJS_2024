import { IMAGE_BLUE_URL_REGEX, IMAGE_GRAY_URL_REGEX, ZOOM_COUNT } from '@helpers/data/testFusionbackpackData.js'
import { expect, test } from '@pages/base.js'
import FusionBackpackPage from '@pages/fusionbackpackPage.js'

test.describe('fusionBackpackPage.spec', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.clickFifthCardImage()
  })

  test('photo Product in full screen', async ({ page }) => {
    const fusionBackpackPage = new FusionBackpackPage(page)
    await fusionBackpackPage.clickProductMainImage()
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackFullScreen()).toBeVisible()
  })

  test('slide photo in home mode', async ({ page }) => {
    const fusionBackpackPage = new FusionBackpackPage(page)
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackActiveImage()).toHaveAttribute('src', /gray/)
    await fusionBackpackPage.clickSlideNextButton()
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackActiveImage()).toHaveAttribute('src', /blue/)
  })

  test('slide photo in full screen mode', async ({ page }) => {
    const fusionBackpackPage = new FusionBackpackPage(page)
    await fusionBackpackPage.clickActiveImage()
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackFullScreen()).toBeVisible()
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackFullScreen()).toHaveAttribute('src', IMAGE_GRAY_URL_REGEX)
    await fusionBackpackPage.clickSlideNextButton()
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackActiveImage()).toHaveAttribute('src', IMAGE_BLUE_URL_REGEX)
  })

  test('zoomPhoto in full screen', async ({ page }) => {
    const fusionBackpackPage = new FusionBackpackPage(page)
    await fusionBackpackPage.clickActiveImage()
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackFullScreen()).toBeVisible()
    for (let i = 1; i <= ZOOM_COUNT; i++) {
      const activeImg = fusionBackpackPage.locators.getFusionBackpackFullScreen()
      const originalHeight = (await activeImg.boundingBox()).height
      await fusionBackpackPage.clickZoomInButton()
      await activeImg.screenshot({ animations: 'disabled' })
      const zoomInHeigth = (await activeImg.boundingBox()).height
      expect.soft(zoomInHeigth).toBeGreaterThan(originalHeight)
    }
    for (let i = 1; i <= ZOOM_COUNT; i++) {
      const activeImg = fusionBackpackPage.locators.getFusionBackpackFullScreen()
      const originalHeight = (await activeImg.boundingBox()).height
      await fusionBackpackPage.clickZoomOutButton()
      await activeImg.screenshot({ animations: 'disabled' })
      const zoomOutHeigth = (await activeImg.boundingBox()).height
      expect.soft(zoomOutHeigth).toBeLessThanOrEqual(originalHeight)
    }
  })

  test('exiting full screen mode clicking on the close button', async ({ page }) => {
    const fusionBackpackPage = new FusionBackpackPage(page)
    await fusionBackpackPage.clickActiveImage()
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackFullScreen()).toBeVisible()
    await fusionBackpackPage.clickCloseButton()
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackActiveImage()).toBeVisible()
  })

  test('exiting full screen mode pressing Escape', async ({ page }) => {
    const fusionBackpackPage = new FusionBackpackPage(page)
    await fusionBackpackPage.clickActiveImage()
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackFullScreen()).toBeVisible()
    await page.keyboard.press('Escape')
    await expect.soft(fusionBackpackPage.locators.getFusionBackpackActiveImage()).toBeVisible()
  })
  test(`Verify fusionBackpackPage match aria snapshot`, { tag: '@aria' }, async ({ page }) => {
    const fusionBackpackPage = new FusionBackpackPage(page)
    await expect.soft(fusionBackpackPage.page.getByRole('main')).toMatchAriaSnapshot({ name: 'fusionBackpackPage.yml' })
  })
})
