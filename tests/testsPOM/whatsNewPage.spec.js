import { BASE_URL, WHATS_NEW_PAGE_END_POINT, WHATS_NEW_PAGE_HEADER } from '@helpers/data/testData.js'
import { expect, test } from '@pages/base.js'
import WhatsNewPage from '@pages/whatsNewPage.js'

test.describe('whatIsNewPage.spec', () => {
  test('Redirect to "Whats New" page', async ({ homePage, page }) => {
    const whatsNewPage = new WhatsNewPage(page)

    await homePage.clickWhatsNewLink()

    await expect.soft(page).toHaveURL(BASE_URL + WHATS_NEW_PAGE_END_POINT)
    await expect.soft(whatsNewPage.locators.getPageHeader()).toHaveText(WHATS_NEW_PAGE_HEADER)
  })

  test("TC 04.1.3_01 Verify the “NEW IN MEN'S section is displayed on the What's New page", async ({ homePage, page }) => {
    const whatsNewPage = new WhatsNewPage(page)

    await homePage.clickWhatsNewLink()

    await expect.soft(whatsNewPage.locators.getMenuNewInMens()).toBeVisible()
  })

  test('TC 04.1.3_02 Verify links are displayed in New In Mens', async ({ homePage, page }) => {
    const whatsNewPage = new WhatsNewPage(page)

    await homePage.clickWhatsNewLink()

    let itemsArr = [
      whatsNewPage.locators.getNewInMensHoodies(),
      whatsNewPage.locators.getNewInMensJackets(),
      whatsNewPage.locators.getNewInMensPants(),
      whatsNewPage.locators.getNewInMensShorts(),
      whatsNewPage.locators.getNewInMensTanks(),
      whatsNewPage.locators.getNewInMensTees()
    ]
    for (let i = 0; i < itemsArr.length; i++) {
      await expect.soft(itemsArr[i]).toBeVisible()
    }
  })
})
