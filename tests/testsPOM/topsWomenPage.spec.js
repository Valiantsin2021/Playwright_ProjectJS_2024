import { test } from '@pages/base.js'
import HomePage from '@pages/homePage.js'
import { expect } from '@playwright/test'

import { BASE_URL, CUSTOMER_USER_DATA, CUSTOMER_WISH_LIST_END_POINT, JACKET_ITEMS, MY_WISH_LIST_EMPTY_MESSAGE, SIGN_IN_PAGE_END_POINT, TOPS_WOMEN_PAGE_END_POINT } from '../../helpers/testData.js'
import { getRandomNumber, urlToRegexPattern } from '../../helpers/testUtils.js'
import { MODE_GRID_ACTIVE_ATTR_CLASS, MODE_LIST_ACTIVE_ATTR_CLASS } from '../../helpers/testWomenData.js'

test.describe('topWomenPage.spec', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.open()
  })

  test('verify message displayed in Wish List Section for Empty Wish List', async ({ page }) => {
    const homePage = new HomePage(page)

    const womenPage = await homePage.hoverWomenMenuitem()
    const topsWomenPage = await womenPage.clickTopsWomenLink()

    await expect.soft(page).toHaveURL(BASE_URL + TOPS_WOMEN_PAGE_END_POINT)
    await expect.soft(topsWomenPage.locators.getWomenMyWishListHeading()).toBeVisible()
    await expect.soft(topsWomenPage.locators.getWomenMyWishListEmptyMessage()).toHaveText(MY_WISH_LIST_EMPTY_MESSAGE)
  })

  test('after applying the filter Jackets, only jackets are displayed on the page', async ({ page }) => {
    const homePage = new HomePage(page)

    const womenPage = await homePage.hoverWomenMenuitem()
    const topsWomenPage = await womenPage.clickTopsWomenLink()

    await topsWomenPage.clickCategoryFilterOption()
    await topsWomenPage.clickFilterOptionJacketsLink()

    const allItemsOnTopsWomenPage = await topsWomenPage.locators.getArrayAllItems()

    const allItemsContainJacketText = allItemsOnTopsWomenPage.every(item => JACKET_ITEMS.some(keyword => item.includes(keyword)))

    expect.soft(allItemsContainJacketText).toBeTruthy()
  })

  test('number of items in Jackets Category equals number of items on the page after filtering', async ({ page }) => {
    const homePage = new HomePage(page)

    const womenPage = await homePage.hoverWomenMenuitem()
    const topsWomenPage = await womenPage.clickTopsWomenLink()

    await topsWomenPage.clickCategoryFilterOption()

    const textOfJacketItems = await topsWomenPage.locators.getTextCategoryJacketItems()
    const expectedNumberJacketItems = parseInt(textOfJacketItems.match(/\d+/))

    await topsWomenPage.clickFilterOptionJacketsLink()

    const allJacketItemsOnPage = await topsWomenPage.locators.getArrayAllItems()
    const actualNumberJacketItems = allJacketItemsOnPage.length

    expect.soft(expectedNumberJacketItems).toEqual(actualNumberJacketItems)
  })

  test('clicking AddToWishList button redirects guest users to Login page', async ({ page }) => {
    const expectedEndPoint = new RegExp(urlToRegexPattern(BASE_URL + SIGN_IN_PAGE_END_POINT))
    const homePage = new HomePage(page)

    const womenPage = await homePage.clickWomenLink()
    const topsWomenPage = await womenPage.clickWomenTopsLink()

    const randomProductCardIndex = getRandomNumber(await topsWomenPage.getAllProductCardsLength())

    await topsWomenPage.hoverRandomWomenTopsProductItem(randomProductCardIndex)
    await topsWomenPage.clickRandomWomenTopsAddToWishListButton(randomProductCardIndex)
    await page.waitForLoadState()

    await expect.soft(page.url(), 'FAIL: SignInPage is NOT opened on click on AddToWishList button for unsigned users.').toMatch(expectedEndPoint)
  })

  test('verify the result of choosing Category, Size, and Color shopping options', async ({ page }) => {
    const homePage = new HomePage(page)

    await homePage.hoverOverWomenMenuItem()
    const topsWomenPage = await homePage.clickOnWomenTopsLink()

    await topsWomenPage.clickCategoryFilterOption()
    await topsWomenPage.clickTeesCategoryShoppingOptions()
    await topsWomenPage.clickSizeShoppingOptions()
    await topsWomenPage.clickSSizeShoppingOptions()
    await topsWomenPage.clickColorShoppingOptions()
    await topsWomenPage.clickPurpleColorShoppingOptions()

    let shoppingByList = await topsWomenPage.locators.getShoppingByFilterList().allTextContents()

    expect.soft(shoppingByList).toEqual(['Tees', 'S', 'Purple'])
  })
  test('women tops display mode can be changed, visible', async ({ page }) => {
    const homePage = new HomePage(page)
    const womenPage = await homePage.hoverWomenMenuitem()
    const topsWomenPage = await womenPage.clickTopsWomenLink()

    await expect.soft(topsWomenPage.locators.getDisplayModeGrid()).toBeVisible()

    await topsWomenPage.clickDisplayModeGrid()
    await expect.soft(topsWomenPage.locators.getDisplayModeGrid()).toHaveClass(MODE_GRID_ACTIVE_ATTR_CLASS)
    await expect.soft(topsWomenPage.locators.getDisplayModeList()).not.toHaveClass(MODE_LIST_ACTIVE_ATTR_CLASS)

    await topsWomenPage.clickDisplayModeList()
    await expect.soft(topsWomenPage.locators.getDisplayModeList()).toBeVisible()
    await expect.soft(topsWomenPage.locators.getDisplayModeList()).toHaveClass(MODE_LIST_ACTIVE_ATTR_CLASS)
  })

  test('item is added to wishlist in left-side section after user logs in', async ({ page }) => {
    const expectedWishListUrl = new RegExp(urlToRegexPattern(BASE_URL + CUSTOMER_WISH_LIST_END_POINT))

    const homePage = new HomePage(page)

    const womenPage = await homePage.clickWomenLink()
    const topsWomenPage = await womenPage.clickWomenTopsLink()

    const randomProductCardIndex = getRandomNumber(await topsWomenPage.getAllProductCardsLength())
    const randomProductCardName = await topsWomenPage.getRandomWomenTopsItemName(randomProductCardIndex + 1)
    const randomProductCardPrice = await topsWomenPage.getRandomWomenTopsItemPrice(randomProductCardIndex + 1)

    await topsWomenPage.hoverRandomWomenTopsProductItem(randomProductCardIndex)
    const signInPage = await topsWomenPage.clickRandomAddToWishListButtonAndSignIn(randomProductCardIndex)
    await page.waitForLoadState()

    await signInPage.fillEmailInputField(CUSTOMER_USER_DATA.email)
    await signInPage.fillPasswordInputField(CUSTOMER_USER_DATA.password)
    const wishListPage = await signInPage.clickButtonSignInAndGoToWishlist()
    await page.waitForLoadState()

    await expect.soft(page.url()).toMatch(expectedWishListUrl)

    await wishListPage.clickUpdateMyWishList()
    await page.waitForLoadState()

    const actualRandomProductCardName = await wishListPage.getLastMyWishListItemNameText()
    const actualRandomProductCardPrice = await wishListPage.getFirstSidebarMyWishListItemPriceText()

    expect.soft(actualRandomProductCardName).toEqual(randomProductCardName)
    expect.soft(actualRandomProductCardPrice).toEqual(randomProductCardPrice)

    await wishListPage.cleanMyWishListFromSideBar()
  })
  test.skip('remove item from wishlist by click X button in left-side section', async ({ page, signIn }) => {
    const expectedWishListUrl = new RegExp(urlToRegexPattern(BASE_URL + CUSTOMER_WISH_LIST_END_POINT))

    const homePage = new HomePage(page)
    await signIn(CUSTOMER_USER_DATA.email, CUSTOMER_USER_DATA.password)

    await page.waitForLoadState()

    const womenPage = await homePage.clickWomenLink()
    const topsWomenPage = await womenPage.clickWomenTopsLink()

    const randomProductCardIndex = getRandomNumber(await topsWomenPage.getAllProductCardsLength())
    await topsWomenPage.hoverRandomWomenTopsProductItem(randomProductCardIndex)

    const randomProductCardName = await topsWomenPage.getRandomWomenTopsItemName(randomProductCardIndex + 1)

    const wishListPage = await topsWomenPage.clickRandomWomenTopsAddToWishListButton(randomProductCardIndex)
    await page.waitForLoadState()

    await expect.soft(page.url()).toMatch(expectedWishListUrl)

    const actualRandomProductCardName = await wishListPage.getFirstSidebarMyWishListItemNameText()
    expect.soft(actualRandomProductCardName).toEqual(randomProductCardName)

    await wishListPage.cleanMyWishListFromSideBar()
    await page.waitForLoadState()

    await expect.soft(wishListPage.locators.getMyWishListEmptyMessage()).toBeVisible()
    await expect.soft(wishListPage.locators.getMyWishListEmptyMessage()).toHaveText(MY_WISH_LIST_EMPTY_MESSAGE)
  })
})
