import { expect, test } from '@playwright/test'
import { BASE_URL } from '../../helpers/testData.js'
import {
  MEN_BOTTOMS_BREADCRUMBS_MENU_BOTTOMS_TEXT,
  MEN_BOTTOMS_BREADCRUMBS_MENU_HOME_TEXT,
  MEN_BOTTOMS_BREADCRUMBS_MENU_MEN_TEXT,
  MEN_BOTTOMS_PAGE_END_POINT,
  MEN_PAGE_END_POINT
} from '../../helpers/testMenData.js'
import HomePage from '../../page_objects/homePage.js'
import MenBottomsPage from '../../page_objects/menBottomsPage'
import MenPage from '../../page_objects/menPage'

test('Men have breadcrumb navigation on the “Men/Bottoms” page and back', async ({ page }) => {
  const homePage = new HomePage(page)
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
