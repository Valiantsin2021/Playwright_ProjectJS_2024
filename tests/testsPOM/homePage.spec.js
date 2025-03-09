import {
  ARGUS_ALL_WEATHER_TANK_PAGE_END_POINT,
  BASE_URL,
  BOTTOMS_WOMEN_PAGE_END_POINT,
  BREATHE_EASY_TANK_PAGE_END_POINT,
  BREATHE_EASY_TANK_PAGE_REVIEWS_TAB_END_POINT,
  CUSTOMER_LOGIN_PAGE_END_POINT,
  CUSTOMER_LOGIN_PAGE_HEADER,
  FUSION_BACKPACK_END_POINT,
  HERO_HOODIE_PAGE_END_POINT,
  NAVBAR_MENU,
  NAVBAR_URLs_END_POINTS,
  PUSH_IT_MESSENGER_BAG_PAGE_END_POINT,
  RADIANT_TEE_PAGE_END_POINT,
  RADIANT_TEE_PAGE_REVIEWS_TAB_END_POINT,
  SEARCH_INVALID_VALUE,
  SEARCH_QUERY,
  SEARCH_QUERY_UPPERCASE,
  SEARCH_RESULTS_JACKET_HEADER,
  SEARCH_RESULTS_JACKET_PAGE_END_POINT,
  SEARCH_VALID_VALUE,
  WARNING_MESSAGE_NO_RESULTS,
  WHATS_NEW_PAGE_END_POINT,
  WHATS_NEW_PAGE_HEADER,
  WOMEN_BOTTOMS_HEADER,
  WOMEN_CATEGORIES
} from '@helpers/data/testData.js'
import { expect, test } from '@pages/base.js'
import SearchNoResultsPage from '@pages/searchNoResultsPage.js'
import SearchResultsJacketPage from '@pages/searchResultsJacketPage.js'
test.describe('homePage.spec', () => {
  test('verify user can navigate to home page clicking on logo from "What\'s New" page', async ({ homePage, page }) => {
    const whatsNewPage = await homePage.clickWhatsNewLink()
    await expect.soft(page).toHaveURL(BASE_URL + WHATS_NEW_PAGE_END_POINT)
    await expect.soft(whatsNewPage.locators.getPageHeader()).toHaveText(WHATS_NEW_PAGE_HEADER)

    await whatsNewPage.clickLogoLink()
    await expect.soft(page).toHaveURL(BASE_URL)
  })

  test('Verify  the automatic search results match the query in the search bar', async ({ homePage }) => {
    await homePage.fillSearchInputField(SEARCH_QUERY)
    expect.soft(await homePage.executeSearchAutocompleteList()).toContain(SEARCH_QUERY)
  })

  test('Verify the search button (magnifier) becomes active after entering one or more letters', async ({ homePage }) => {
    await expect.soft(await homePage.locators.getSearchButton()).toHaveAttribute('disabled')
    await homePage.fillSearchInputField(SEARCH_QUERY)
    await expect.soft(homePage.locators.getSearchButton()).not.toHaveAttribute('disabled')
  })

  test.skip('Verify the search field is not case-sensitive', async ({ homePage }) => {
    await homePage.fillSearchInputField(SEARCH_QUERY)

    const autocompleteListLowerCaseActual = await homePage.executeSearchAutocompleteList()
    await homePage.clearSearchInputField()
    await homePage.fillSearchInputField(SEARCH_QUERY_UPPERCASE)

    const autocompleteListUpperCaseActual = await homePage.executeSearchAutocompleteList()
    expect.soft(autocompleteListLowerCaseActual.sort()).toEqual(autocompleteListUpperCaseActual.sort())
    expect.soft(autocompleteListLowerCaseActual.length).toEqual(autocompleteListUpperCaseActual.length)
  })

  test('Verify user can make search entered the valid text in the search field', async ({ homePage, page }) => {
    const searchResultsJacketPage = new SearchResultsJacketPage(page)

    await homePage.fillSearchInputField(SEARCH_VALID_VALUE)
    await homePage.locators.getSearchButton().click()

    await expect.soft(searchResultsJacketPage.locators.getSearchResultsHeader()).toHaveText(SEARCH_RESULTS_JACKET_HEADER)
    await expect.soft(page).toHaveURL(BASE_URL + SEARCH_RESULTS_JACKET_PAGE_END_POINT)
  })

  test('1st card: clicking card image redirects to respective product card', async ({ homePage, page }) => {
    const radiantTeePage = await homePage.clickFirstCardImage()

    await expect.soft(page).toHaveURL(BASE_URL + RADIANT_TEE_PAGE_END_POINT)
    await expect.soft(radiantTeePage.locators.getRadiantTeeHeader()).toBeVisible()
  })

  test('Verify user doesn`t receive the results when make search with invalid text ', async ({ homePage, page }) => {
    const searchNoResultsPage = new SearchNoResultsPage(page)

    await homePage.fillSearchInputField(SEARCH_INVALID_VALUE)
    await homePage.locators.getSearchButton().click()
    await expect.soft(searchNoResultsPage.locators.getWarningMessageNoResults()).toHaveText(WARNING_MESSAGE_NO_RESULTS)
    await expect.soft(searchNoResultsPage.locators.getNoResultsInfo()).toBeHidden()
  })

  test('Verify the search button (magnifier) is inactive after the search field is cleared', async ({ homePage }) => {
    await homePage.fillSearchInputField(SEARCH_QUERY)
    await expect.soft(homePage.locators.getSearchButton()).not.toHaveAttribute('disabled')

    await homePage.clearSearchInputField()
    await expect.soft(homePage.locators.getSearchButton()).toHaveAttribute('disabled')
  })

  test('Verify user can hover over the title “Women” and see dropdown list with 2 subcategories', async ({ homePage }) => {
    await homePage.hoverWomenLink()
    await expect.soft(homePage.locators.getWomenCategories()).toHaveText(WOMEN_CATEGORIES)
  })

  test('1st card: clicking card name redirects to respective product cards', async ({ homePage, page }) => {
    const radiantTeePage = await homePage.clickFirstCardName()
    await expect.soft(page).toHaveURL(BASE_URL + RADIANT_TEE_PAGE_END_POINT)
    await expect.soft(radiantTeePage.locators.getRadiantTeeHeader()).toBeVisible()
  })

  test('1st card: clicking card reviews redirects to "reviews" tab on respective product card', async ({ homePage, page }) => {
    const radiantTeePage = await homePage.clickFirstCardReviews()
    await expect.soft(page).toHaveURL(BASE_URL + RADIANT_TEE_PAGE_REVIEWS_TAB_END_POINT)
    await expect.soft(radiantTeePage.locators.getRadiantTeeReviewsTab()).toBeVisible()
  })

  test('2nd card: clicking the card name redirects to the respective product card', async ({ homePage, page }) => {
    const breatheEasyTankPage = await homePage.clickSecondCardName()
    await expect.soft(page).toHaveURL(BASE_URL + BREATHE_EASY_TANK_PAGE_END_POINT)
    await expect.soft(breatheEasyTankPage.locators.getBreatheEasyTankHeader()).toBeVisible()
  })

  test('2nd card: clicking the card image redirects to the respective product card', async ({ homePage, page }) => {
    const breatheEasyTankPage = await homePage.clickSecondCardImage()
    await expect.soft(page).toHaveURL(BASE_URL + BREATHE_EASY_TANK_PAGE_END_POINT)
    await expect.soft(breatheEasyTankPage.locators.getBreatheEasyTankHeader()).toBeVisible()
  })

  test('2nd card: clicking card reviews redirects to "reviews" tab on respective product card', async ({ homePage, page }) => {
    const breatheEasyTankPage = await homePage.clickSecondCardReviews()
    await expect.soft(page).toHaveURL(BASE_URL + BREATHE_EASY_TANK_PAGE_REVIEWS_TAB_END_POINT)
    await expect.soft(breatheEasyTankPage.locators.getBreatheEasyTankReviewsTab()).toBeVisible()
  })

  test('Click on Sign in and assert user redirection to the Login page', async ({ homePage, page }) => {
    const signInPage = await homePage.clickSignInLink()

    await expect.soft(page).toHaveURL(BASE_URL + CUSTOMER_LOGIN_PAGE_END_POINT)
    await expect.soft(signInPage.locators.getPageHeader()).toHaveText(CUSTOMER_LOGIN_PAGE_HEADER)
  })

  test('Verify that the user can navigate from the home page to the "Women - Bottoms" page', async ({ homePage, page }) => {
    await homePage.hoverWomenMenuitem()

    const bottomsWomenPage = await homePage.clickBottomsWomenLink()
    await expect.soft(page).toHaveURL(BASE_URL + BOTTOMS_WOMEN_PAGE_END_POINT)
    await expect.soft(bottomsWomenPage.locators.getWomenBottomsPageHeader()).toHaveText(WOMEN_BOTTOMS_HEADER)
  })

  test('3rd card: clicking the card image redirects to the respective product card', async ({ homePage, page }) => {
    const argusAllWeatherTankPage = await homePage.clickThirdCardImage()
    await expect.soft(page).toHaveURL(BASE_URL + ARGUS_ALL_WEATHER_TANK_PAGE_END_POINT)
    await expect.soft(argusAllWeatherTankPage.locators.getArgusAllWeatherTankPageHeader()).toBeVisible()
  })

  test('3rd card: clicking the card name redirects to the respective product card', async ({ homePage, page }) => {
    const argusAllWeatherTankPage = await homePage.clickThirdCardName()
    await expect.soft(page).toHaveURL(BASE_URL + ARGUS_ALL_WEATHER_TANK_PAGE_END_POINT)
    await expect.soft(argusAllWeatherTankPage.locators.getArgusAllWeatherTankPageHeader()).toBeVisible()
  })

  test('4th card: clicking the card name redirects to the respective product card', async ({ homePage, page }) => {
    const heroHoodiePage = await homePage.clickFourthCardName()
    await expect.soft(page).toHaveURL(BASE_URL + HERO_HOODIE_PAGE_END_POINT)
    await expect.soft(heroHoodiePage.locators.getHeroHoodieHeader()).toBeVisible()
  })

  test('4th card: clicking the card image redirects to the respective product card', async ({ homePage, page }) => {
    const heroHoodiePage = await homePage.clickFourthCardImage()
    await expect.soft(page).toHaveURL(BASE_URL + HERO_HOODIE_PAGE_END_POINT)
    await expect.soft(heroHoodiePage.locators.getHeroHoodieHeader()).toBeVisible()
  })

  test('5th card: clicking the card image redirects to the respective product card', async ({ homePage, page }) => {
    const fusionbackpack = await homePage.clickFifthCardImage()
    await expect.soft(page).toHaveURL(BASE_URL + FUSION_BACKPACK_END_POINT)
    await expect.soft(fusionbackpack.locators.getFusionBackpackHeader()).toBeVisible()
  })

  test('5th card: clicking the card name redirects to the respective product card', async ({ homePage, page }) => {
    const fusionbackpack = await homePage.clickFifthCardName()
    await expect.soft(page).toHaveURL(BASE_URL + FUSION_BACKPACK_END_POINT)
    await expect.soft(fusionbackpack.locators.getFusionBackpackHeader()).toBeVisible()
  })

  test('5th card: clicking card reviews redirects to "reviews" tab on respective product card', async ({ homePage }) => {
    const fusionbackpack = await homePage.clickFifthCardReviews()
    await expect.soft(fusionbackpack.locators.getFusionBackpackHeader()).toBeVisible()
    await expect.soft(fusionbackpack.locators.getFusionBackpackReviewsTab()).toBeVisible()
  })

  test('6th card: clicking the card image redirects to the respective product card', async ({ homePage, page }) => {
    const pushItMessengerBagPage = await homePage.clickSixthCardImage()
    await expect.soft(page).toHaveURL(BASE_URL + PUSH_IT_MESSENGER_BAG_PAGE_END_POINT)
    await expect.soft(pushItMessengerBagPage.locators.getPushItMessengerBagPageHeader()).toBeVisible()
  })

  test('6th card: clicking the card name redirects to the respective product card', async ({ homePage, page }) => {
    const pushItMessengerBagPage = await homePage.clickSixthCardName()
    await expect.soft(page).toHaveURL(BASE_URL + PUSH_IT_MESSENGER_BAG_PAGE_END_POINT)
    await expect.soft(pushItMessengerBagPage.locators.getPushItMessengerBagPageHeader()).toBeVisible()
  })

  test('6th card: clicking card reviews redirects to "reviews" tab on respective product card', async ({ homePage }) => {
    const pushItMessengerBagPage = await homePage.clickSixthCardReviews()
    await expect.soft(pushItMessengerBagPage.locators.getPushItMessengerBagPageReviewsTab()).toBeVisible()
    await expect.soft(pushItMessengerBagPage.locators.getPushItMessengerBagPageHeader()).toBeVisible()
  })

  test("Verification clickables elements in product's card", async ({ homePage }) => {
    const radiantTeePage = await homePage.clickHotSellersCardLink(0)
    await expect.soft(radiantTeePage.locators.getRadiantTeeHeader()).toBeVisible()

    await radiantTeePage.clickRadiantTeeSizeM()
    await radiantTeePage.clickRadiantTeeColorPurple()

    await expect.soft(radiantTeePage.locators.getRadiantTeeSizeMChoose().getByText('M', { exact: true })).toBeVisible()
  })

  test(`verify 6 menu options on the main menu have particular text and clickable`, async ({ homePage, page }) => {
    const mainMenuLinks = await homePage.locators.getMainMenuLinks()

    for (let i = 0; i < NAVBAR_MENU.length; i++) {
      const link = mainMenuLinks.nth(i)
      await expect.soft(link).toHaveText(NAVBAR_MENU[i])

      await homePage.clickMainMenuLinks(i)
      await expect.soft(page).toHaveURL(NAVBAR_URLs_END_POINTS[i])
      await expect.soft(page.getByRole('heading').first()).toHaveText(NAVBAR_MENU[i])
    }
  })

  test(`Verify changing quantity of product in card section 'Hot seller'`, async ({ homePage }) => {
    const qty = '100'
    await homePage.scrollToHotSellerSection()
    const productCardPage = await homePage.clickRandomCard()

    const quantityValue = await productCardPage.getQuantityValue()
    expect.soft(quantityValue).toBe('1')

    await productCardPage.enterQuantityNumber(qty)

    const enteredQuantityValue = await productCardPage.getQuantityValue()
    expect.soft(enteredQuantityValue).toBe(qty)
  })
})
