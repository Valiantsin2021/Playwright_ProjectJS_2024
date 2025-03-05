import { expect, test } from '@playwright/test'
import { MessageComparisonList } from '../../helpers/testData'
import HomePage from '../../page_objects/homePage'
import JacketsWomenPage from '../../page_objects/jacketsWomenPage'

test.describe('jacketsWomen.spec', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.open()
    await homePage.hoverWomenLink()
    await homePage.hoverWomenTopsLink()
    await homePage.clickWomenJacketsLink()
  })
  test.skip('Verify message add to comparison list', async ({ page }) => {
    const jacketsWomenPage = new JacketsWomenPage(page)

    await jacketsWomenPage.hoverOlivia14ZipLightJacket()

    await expect.soft(jacketsWomenPage.locators.getAddToCompareButton()).toBeVisible()
    await jacketsWomenPage.clickAddToCompareButton()

    const actualResult = await jacketsWomenPage.locators.getMessageAddedProductComparisonList().textContent()

    expect.soft(actualResult).toContain(MessageComparisonList)
  })
})
