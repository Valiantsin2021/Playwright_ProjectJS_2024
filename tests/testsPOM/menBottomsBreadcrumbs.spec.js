import {
  MEN_BOTTOMS_BREADCRUMBS_MENU_BOTTOMS_TEXT,
  MEN_BOTTOMS_BREADCRUMBS_MENU_HOME_TEXT,
  MEN_BOTTOMS_BREADCRUMBS_MENU_MEN_TEXT,
  MEN_BOTTOMS_PAGE_END_POINT,
  MEN_PAGE_END_POINT
} from '@helpers/data/testMenData.js'
import { expect, test } from '@pages/base.js'
import MenBottomsPage from '@pages/menBottomsPage'
import MenPage from '@pages/menPage'
import { BASE_URL } from '../../helpers/data/testData.js'

test('Men have breadcrumb navigation on the “Men/Bottoms” page and back', async ({ homePage, page }) => {
  const menBottomsPage = new MenBottomsPage(page)
  const menPage = new MenPage(page)

  await homePage.open()
  await homePage.hoverMenLink()
  await homePage.clickMenBottomsLink()

  await expect.soft(page).toHaveURL(MEN_BOTTOMS_PAGE_END_POINT)
  await expect.soft(menBottomsPage.locators.getMenBottomsBreadcrumbs()).toBeVisible()
  await expect.soft(menBottomsPage.locators.getBreadcrumbsMenuHome()).toHaveText(MEN_BOTTOMS_BREADCRUMBS_MENU_HOME_TEXT)
  await expect.soft(menBottomsPage.locators.getBreadcrumbsMenuMen()).toHaveText(MEN_BOTTOMS_BREADCRUMBS_MENU_MEN_TEXT)
  await expect.soft(menBottomsPage.locators.getBreadcrumbsMenuBottoms()).toHaveText(MEN_BOTTOMS_BREADCRUMBS_MENU_BOTTOMS_TEXT)

  await menBottomsPage.clickBreadcrumbsMenuMen()

  await expect.soft(page).toHaveURL(MEN_PAGE_END_POINT)

  await menPage.clickBeadcrumbsMenuHome()

  await expect.soft(page).toHaveURL(BASE_URL)
})
