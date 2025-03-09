import { MessageComparisonList } from '@helpers/data/testData'
import { expect, test } from '@pages/base'
import JacketsWomenPage from '@pages/jacketsWomenPage'

test.describe('jacketsWomen.spec', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.hoverWomenLink()
    await homePage.hoverWomenTopsLink()
    await homePage.clickWomenJacketsLink()
  })
  test('Verify message add to comparison list', async ({ page }) => {
    const jacketsWomenPage = new JacketsWomenPage(page)

    await jacketsWomenPage.hoverOlivia14ZipLightJacket()

    await expect.soft(jacketsWomenPage.locators.getAddToCompareButton()).toBeVisible()
    await jacketsWomenPage.clickAddToCompareButton()

    const actualResult = await jacketsWomenPage.locators.getMessageAddedProductComparisonList().textContent()

    expect.soft(actualResult).toContain(MessageComparisonList)
  })
})
