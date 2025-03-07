import {
  BASE_URL,
  FOOTER_LINK_NAME,
  FOOTER_LINKs_URLs_END_POINTS,
  FOOTER_ORDERS_AND_RETURNS_PAGE_END_POINT,
  NOTES_PAGE_URL,
  ORDERS_AND_RETURNS_PAGE_FIELDS,
  SEARCH_ADVANCED_PAGE_END_POINT,
  SEARCH_ADVANCED_PAGE_HEADER,
  SEARCH_TERMS_POPULAR_PAGE_END_POINT,
  SEARCH_TERMS_POPULAR_PAGE_HEADER
} from '@helpers/data/testData.js'
import { expect, test } from '@pages/base.js'
import Footer from '@pages/footer.js'
import SearchTermPopularPage from '@pages/searchTermPopularPage.js'
test.describe('footer.spec', () => {
  test('Verify visibility of footer', async ({ homePage }) => {
    const footer = new Footer(homePage.page)
    await expect.soft(footer.locators.getFooter()).toBeVisible()
  })

  test('link "Search Terms" is clickabel', async ({ homePage }) => {
    const searchTermPopularPage = new SearchTermPopularPage(homePage.page)

    await homePage.open()
    await homePage.clickSearchTermPopularLink()

    await expect.soft(homePage.page).toHaveURL(BASE_URL + SEARCH_TERMS_POPULAR_PAGE_END_POINT)
    await expect.soft(searchTermPopularPage.locators.getSearchTermPopularHeader()).toContainText(SEARCH_TERMS_POPULAR_PAGE_HEADER)
  })

  test('Verify that "Search terms" link redirects to the "Popular Search Terms" page', async ({ homePage, page }) => {
    const searchTermPopularPage = await homePage.getFooter().clickSearchTerms()
    await expect.soft(page).toHaveURL(BASE_URL + SEARCH_TERMS_POPULAR_PAGE_END_POINT)
    await expect.soft(page).toHaveTitle(SEARCH_TERMS_POPULAR_PAGE_HEADER)

    await searchTermPopularPage.getHeader().clickLogoLink()
    await expect.soft(page).toHaveURL(BASE_URL)

    const list = await homePage.locators.getNavigationMenuItemsList()
    for (const item of await list.all()) {
      await item.click()
      await new Footer(page).clickSearchTerms()
      await expect.soft(page).toHaveURL(BASE_URL + SEARCH_TERMS_POPULAR_PAGE_END_POINT)
      await expect.soft(page).toHaveTitle(SEARCH_TERMS_POPULAR_PAGE_HEADER)
    }
  })

  test('Verify links visibility in the footer for logged-in user', async ({ homePage, page }) => {
    await homePage.open()

    const signInPage = await homePage.clickSignInLink()
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()

    await signInPage.clickButtonSignIn()
    const footerPage = new Footer(page)
    await expect.soft(footerPage.locators.getSearchTerms()).toBeVisible()
    await expect.soft(footerPage.locators.getPrivacyAndCookiePolicyLink()).toBeVisible()
    await expect.soft(footerPage.locators.getNotesLink()).toBeVisible()
    await expect.soft(footerPage.locators.getAdvancedSearchLink()).toBeVisible()
  })

  FOOTER_LINK_NAME.forEach((linkName, idx) => {
    test.fixme(`Verify ${linkName} is clickable and redirects logged-in user to the required page`, async ({ homePage, page }) => {
      const signInPage = await homePage.clickSignInLink()
      await signInPage.fillFieldEmail()
      await signInPage.fillFieldPassword()
      await signInPage.clickButtonSignIn()
      await expect.soft(page).toHaveURL(BASE_URL + FOOTER_LINKs_URLs_END_POINTS[idx])
    })
  })

  test('Link "Advanced Search" is clickable and redirectable', async ({ homePage }) => {
    const footer = new Footer(homePage.page)
    const searchAdvancedPage = await footer.clickAdvancedSearchLink()

    await expect.soft(footer.page).toHaveURL(BASE_URL + SEARCH_ADVANCED_PAGE_END_POINT)
    await expect.soft(searchAdvancedPage.locators.getPageHeader()).toHaveText(SEARCH_ADVANCED_PAGE_HEADER)
  })

  test('Verify Notes link is clickable and redirects logged-in user to the required page', async ({ homePage, page }) => {
    const signInPage = await homePage.clickSignInLink()
    await signInPage.fillFieldEmail()
    await signInPage.fillFieldPassword()
    await signInPage.clickButtonSignIn()

    const pagePromise = page.waitForEvent('popup')
    await homePage.getFooter().clickNotesLink()
    const notesPage = await pagePromise
    await expect.soft(notesPage).toHaveURL(NOTES_PAGE_URL)
  })

  test.fixme('"Order and Returns” link redirects to the page, and displays particular fields', async ({ homePage, page }) => {
    const footerPage = new Footer(page)
    await expect.soft(page).toHaveURL(BASE_URL + FOOTER_ORDERS_AND_RETURNS_PAGE_END_POINT)

    const fields = await footerPage.locators.getOrdersAndReturnsPageFields()

    for (let i = 0; i < ORDERS_AND_RETURNS_PAGE_FIELDS.length; i++) {
      const field = fields[i]
      await expect.soft(field).toHaveText(ORDERS_AND_RETURNS_PAGE_FIELDS[i])
    }
  })
})
