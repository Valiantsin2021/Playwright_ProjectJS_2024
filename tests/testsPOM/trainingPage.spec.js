import {
  BASE_URL,
  COMPARE_PRODUCT_PAGE_HEADER,
  COMPARE_PRODUCT_PAGE_ITEM_TEXT,
  COMPARE_URL_REGEX,
  MY_WISHLIST_PAGE_HEADER,
  MY_WISHLIST_PAGE_ITEM_TEXT,
  MY_WISHLIST_PAGE_URL,
  TRAINING_PAGE_BREADCRUMBS_MENU_HOME_TEXT,
  TRAINING_PAGE_BREADCRUMBS_MENU_TRAINING_TEXT,
  TRAINING_PAGE_HEADER,
  TRAINING_PAGE_VIDEODOWNLOAD_URL,
  TRAINING_URL,
  VIDEODOWNLOAD_PAGE_HEADER
} from '@helpers/testData.js'
import { expect, test } from '@pages/base'

test.describe('trainingPage.spec', () => {
  test('Verify that the "Training" link redirects to the training\'s products page', async ({ homePage, page }) => {
    const trainingPage = await homePage.clickTrainingLink()

    await expect.soft(page).toHaveURL(TRAINING_URL)
    await expect.soft(trainingPage.locators.getTrainingHeader()).toBeVisible()
    await expect.soft(trainingPage.locators.getTrainingHeader()).toContainText(TRAINING_PAGE_HEADER)
  })

  test('Verify that the correct breadcrumb navigation is displayed on the "Training" page and leading up to this section (Home > Training)', async ({ homePage, page }) => {
    const trainingPage = await homePage.clickTrainingLink()

    await expect.soft(trainingPage.locators.getBreadcrumbMenuAll()).toBeVisible()
    await expect.soft(trainingPage.locators.getBreadcrumbMenuTraining()).toBeVisible()
    await expect.soft(trainingPage.locators.getBreadcrumbMenuTraining()).toHaveText(TRAINING_PAGE_BREADCRUMBS_MENU_TRAINING_TEXT)
    await expect.soft(trainingPage.locators.getBreadcrumbMenuHome()).toBeVisible()
    await expect.soft(trainingPage.locators.getBreadcrumbMenuHome()).toHaveText(TRAINING_PAGE_BREADCRUMBS_MENU_HOME_TEXT)

    await trainingPage.clickBreadcrumbMenuHome()
    await expect.soft(page).toHaveURL(BASE_URL)
  })

  test('Verify that the promo block is displayed on the “Training” page', async ({ homePage }) => {
    const trainingPage = await homePage.clickTrainingLink()

    expect.soft(trainingPage.locators.getTrainingPromoBlock()).toBeTruthy()
    await expect.soft(trainingPage.locators.getTrainingPromoBlock()).toBeVisible()
  })

  test('Verify that the "Shop By Category" section is displayed on the “Training” page', async ({ homePage }) => {
    const trainingPage = await homePage.clickTrainingLink()

    expect.soft(trainingPage.locators.getTrainingShopByCategorySection()).toBeTruthy()
    await expect.soft(trainingPage.locators.getTrainingShopByCategorySection()).toBeVisible()
  })

  test('Verify that clicking on the "Video Download" link redirects to the correct "Video Download" page', async ({ homePage, page }) => {
    const trainingPage = await homePage.clickTrainingLink()
    const videoDownloadPage = await trainingPage.clickVideoDownloadLink()

    await expect.soft(page).toHaveURL(TRAINING_PAGE_VIDEODOWNLOAD_URL)
    await expect.soft(videoDownloadPage.locators.getVideoDownloadHeader()).toBeVisible()
    await expect.soft(videoDownloadPage.locators.getVideoDownloadHeader()).toContainText(VIDEODOWNLOAD_PAGE_HEADER)
  })

  test('Verify that the User can use the “Compare Products” feature to compare different training products and identify their features and benefits', async ({ homePage, page }) => {
    await homePage.hoverGearMenuItem()
    const gearBagsPage = await homePage.clickGearBagsSubmenuItem()
    await gearBagsPage.hoverPushItMessengerItem()
    await gearBagsPage.clickgetPushItMessengerItemAddtoCampare()
    const trainingPage = await gearBagsPage.clickTrainingLink()
    const compareProductsPage = await trainingPage.clickTrainingCompareButton()

    const currentURL = page.url()
    expect.soft(currentURL).toMatch(COMPARE_URL_REGEX)
    await expect.soft(compareProductsPage.locators.getCompareProductsHeader()).toBeVisible()
    await expect.soft(compareProductsPage.locators.getCompareProductsHeader()).toContainText(COMPARE_PRODUCT_PAGE_HEADER)
    await expect.soft(compareProductsPage.locators.getCompareProductsItem()).toBeVisible()
    await expect.soft(compareProductsPage.locators.getCompareProductsItem()).toContainText(COMPARE_PRODUCT_PAGE_ITEM_TEXT)
  })

  test('Verify that the User can add training products to the wish list for tracking and accessing additional information about them in the training materials', async ({ homePage, page }) => {
    const signInPage = await homePage.clickSignInLink()
    await signInPage.fillEmailField()
    await signInPage.fillPasswordField()
    await signInPage.clickButtonSignIn()

    await homePage.hoverGearMenuItem()
    const gearBagsPage = await homePage.clickGearBagsSubmenuItem()
    const pushItMessengerBagPage = await gearBagsPage.clickPushItMessengerItem()
    const wishListPage = await pushItMessengerBagPage.clickPushItMessengerItemAddtoWishList()

    const trainingPage = await wishListPage.clickTrainingLink()

    await trainingPage.clickGoToWishListLink()

    await expect.soft(page).toHaveURL(MY_WISHLIST_PAGE_URL)
    await expect.soft(wishListPage.locators.getMyWishListHeader()).toBeVisible()
    await expect.soft(wishListPage.locators.getMyWishListHeader()).toContainText(MY_WISHLIST_PAGE_HEADER)
    await wishListPage.hoverMyWishListItemName()
    await expect.soft(wishListPage.locators.getMyWishListItemNameLocator()).toBeVisible()
    await expect.soft(wishListPage.locators.getMyWishListItemNameLocator()).toHaveText(MY_WISHLIST_PAGE_ITEM_TEXT)
  })
})
