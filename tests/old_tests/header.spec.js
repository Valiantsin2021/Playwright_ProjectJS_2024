import { expect, test } from '@playwright/test'

test.describe('header', () => {
  const BASE_URL = 'https://magento.softwaretestingboard.com'

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('verify Home page title', async ({ page }) => {
    await expect.soft(page).toHaveTitle('Home Page')
  })

  test('verify user can navigate to home page clicking on logo from "What\'s New" page', async ({ page }) => {
    await page.getByRole('listitem').filter({ hasText: "What's New" }).click()
    await expect.soft(page).toHaveURL(BASE_URL + '/what-is-new.html')

    await page.getByLabel('store logo').click()
    await expect.soft(page).toHaveURL(BASE_URL)
  })

  test('navigate to home page clicking on logo from "What\'s New" page', async ({ page }) => {
    await page.getByRole('listitem').filter({ hasText: "What's New" }).click()
    await expect.soft(page).toHaveURL(BASE_URL + '/what-is-new.html')

    await page.getByLabel('store logo').click()
    await expect.soft(page).toHaveURL(BASE_URL)
  })

  test('Verify the Create an Account link is displayed on the main page in the header', async ({ page }) => {
    const createAccountPage = page.locator('h1.page-title')
    await expect.soft(createAccountPage).toBeVisible()
  })

  test('Verify after clicking the “Create an account" link the Create New Customer Account page opens', async ({ page }) => {
    await page.getByRole('link', { name: 'Create an Account' }).click()

    const createAccountPage = page.locator('h1.page-title')
    await expect.soft(createAccountPage).toBeVisible()
    await expect.soft(page).toHaveURL(BASE_URL + '/customer/account/create/')
  })

  test('TC 01.1.2_01 | Verify that clicking on Sing in redirects to the login page', async ({ page }) => {
    const signInLocator = page.locator('.page-header').getByRole('link', { name: 'Sign In' })
    const LOGIN_PAGE_URL = 'https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/'
    const loginMainHeaderLocator = page.getByRole('heading', { name: 'Customer Login' })
    const sighInHeader = 'Customer Login'
    await signInLocator.click()

    await expect.soft(page).toHaveURL(LOGIN_PAGE_URL)
    await expect.soft(loginMainHeaderLocator).toHaveText(sighInHeader)
  })

  test('TC 01.4.1_01 <Header/Shopping Cart Icon> Verify a counter with the number of items in the cart is displayed after adding new product', async ({ page }) => {
    await page.getByRole('option', { name: 'XS' }).first().click()
    await page.getByRole('option', { name: 'Blue' }).first().click()
    await page.getByTitle('Add to Cart').first().click()
    const itemsNumber = page.locator('.counter-number')
    await itemsNumber.waitFor()

    await expect.soft(itemsNumber).toHaveText('1')
  })

  test('TC 01.1.1_02 <Header/Header logo> Validate website has store logo', async ({ page }) => {
    const storeLogo = page.locator('.logo img')

    await expect.soft(storeLogo).toBeVisible()
  })

  test('TC 01.4.1_02 <Header/Shopping Cart Icon> Verify only shopping cart icon is displayed if no items in the shopping cart', async ({ page }) => {
    const shoppingCartIcon = page.locator('.showcart')
    const counter = page.locator('.counter-number')

    await expect.soft(shoppingCartIcon).toBeVisible()
    await expect.soft(counter).not.toBeVisible()
  })

  test.skip('TC 01.1.2_03 The user can enter login details and authenticate', async ({ page }) => {
    const signInLocator = page.locator('.page-header').getByRole('link', { name: 'Sign In' })
    await signInLocator.click()

    const LOGIN_PAGE_URL = 'https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/'
    await expect.soft(page).toHaveURL(LOGIN_PAGE_URL)

    let email = 'rimma.mukhoryapova@gmail.com'
    let password = 'Qwerty123'

    await page.getByLabel('Email').fill(email)
    await page.getByLabel('Password').fill(password)
    await page.getByRole('button', { name: 'Sign In' }).click()

    const welcomeText = page.locator('header .logged-in')
    await expect.soft(welcomeText).toBeVisible()
  })

  test('TC 01.1.2_02 Link Sign In is located in the top right corner of every page of the website', async ({ page }) => {
    const signInLocator = page.locator('.page-header').getByRole('link', { name: 'Sign In' })
    await expect.soft(signInLocator).toBeVisible()

    const headerLinks = page.locator('.header.panel>.header.links')
    await expect.soft(headerLinks).toHaveCSS('float', 'right')

    const whatsNewPage = page.locator('#ui-id-3')
    await whatsNewPage.click()
    await expect.soft(signInLocator).toBeVisible()
    await expect.soft(headerLinks).toHaveCSS('float', 'right')
    await expect.soft(headerLinks).toHaveCSS('margin-top', '0px')
  })

  const navigationMenuNames = ["What's New", 'Women', 'Men', 'Gear', 'Training', 'Sale']

  navigationMenuNames.forEach(item => {
    test(`TC 01.1.2_04 Link Sign In is located on every ${item} of the website1`, async ({ page }) => {
      const signInLocator = page.locator('.page-header').getByRole('link', { name: 'Sign In' })
      await expect.soft(signInLocator).toBeVisible()

      const pageName = page.getByText(item, { exact: true })
      await pageName.click()

      const pageNameTitle = await page.locator('h1.page-title').innerText()
      expect.soft(pageNameTitle).toEqual(item)
      await expect.soft(signInLocator).toBeVisible()
    })
  })

  test('TC 01.2.1_08 Drop-down list in the search', async ({ page }) => {
    await page.getByPlaceholder('Search entire store here').click()
    await page.getByPlaceholder('Search entire store here').fill('bag')
    await expect.soft(page.locator('#search_autocomplete > ul > li')).toHaveCount(8)
  })

  test('Redirect after signing in to the Sale page', async ({ page }) => {
    const login = 'djiwiixixevpaawtax@cazlv.com'
    const password = 'Q1234567890!'

    await page.getByText('Sale').click()

    const signInLink = page.getByRole('link', { name: 'Sign In' })

    await signInLink.waitFor()
    await signInLink.click()
    await page.locator('#email').fill(login)
    await page.locator('[title="Password"]').fill(password)
    await page.getByRole('button', { name: 'Sign In' }).click()

    await expect.soft(page.locator('[class="panel header"] .logged-in')).toBeAttached()
    await expect.soft(page).toHaveURL(BASE_URL + '/sale.html')
    await expect.soft(page.getByRole('heading', { name: 'Sale' })).toBeVisible()
  })
  test('Verify sign in link is displayed on every page header of the website in the right', async ({ page }) => {
    const pageLinksArr = [
      'https://magento.softwaretestingboard.com/what-is-new.html',
      'https://magento.softwaretestingboard.com/women.html',
      'https://magento.softwaretestingboard.com/men.html',
      'https://magento.softwaretestingboard.com/gear.html',
      'https://magento.softwaretestingboard.com/training.html',
      'https://magento.softwaretestingboard.com/sale.html',
      'https://magento.softwaretestingboard.com/customer/account/create/'
    ]
    for (let i = 0; i < pageLinksArr.length; i++) {
      let link = pageLinksArr[i]
      await page.goto(link)
      const signInLink = page.locator('.authorization-link').first()
      const signInBox = await signInLink?.boundingBox()
      await expect.soft(signInBox.x > signInBox.y).toBe(true)
    }
  })

  test('Verify  the automatic search results match the query in the search bar', async ({ page }) => {
    const searchItem = 'short'

    await page.getByPlaceholder('Search entire store here...').fill(searchItem)
    await page.waitForSelector('#search_autocomplete>ul>li>span:first-child')

    const autocompleteList = await page.locator('#search_autocomplete>ul>li>span:first-child').allInnerTexts()

    await expect.soft(autocompleteList).toContain(searchItem)
  })

  test('Verify the search button (magnifier) becomes active after entering one or more letters', async ({ page }) => {
    await expect.soft(page.locator("button[title='Search']")).toHaveAttribute('disabled')

    await page.getByPlaceholder('Search entire store here...').fill('a')
    await expect.soft(page.locator("button[title='Search']")).not.toHaveAttribute('disabled')
  })

  test('The message “You have no items in your shopping cart.“ is displayed.', async ({ page }) => {
    await page.locator('.showcart').click()
    await expect.soft(page.locator('.subtitle')).toBeVisible()
    await expect.soft(page.locator('.subtitle')).toHaveText('You have no items in your shopping cart.')
  })

  test('Verify the search field is not case-sensitive', async ({ page }) => {
    const searchItemUpperCase = 'SHORT'
    const searchItemLowerCase = searchItemUpperCase.toLowerCase()

    await page.getByPlaceholder('Search entire store here...').fill(searchItemUpperCase)
    await page.waitForSelector('#search_autocomplete>ul>li>span:first-child')
    const autocompleteListUpperCase = await page.locator('#search_autocomplete>ul>li>span:first-child').allInnerTexts()

    await page.getByPlaceholder('Search entire store here...').clear()

    await page.getByPlaceholder('Search entire store here...').fill(searchItemLowerCase)
    await page.waitForSelector('#search_autocomplete>ul>li>span:first-child')
    const autocompleteListLowerCase = await page.locator('#search_autocomplete>ul>li>span:first-child').allInnerTexts()

    await expect.soft(autocompleteListUpperCase.sort()).toEqual(autocompleteListLowerCase.sort())
    await expect.soft(autocompleteListLowerCase.length).toEqual(autocompleteListUpperCase.length)
  })

  test('Verify the search button (magnifier) is inactive after the search field is cleared', async ({ page }) => {
    const wordToType = 'abc'

    await page.getByPlaceholder('Search entire store here...').fill(wordToType)
    await expect.soft(page.locator("button[title='Search']")).not.toHaveAttribute('disabled')

    await page.getByPlaceholder('Search entire store here...').clear()
    await expect.soft(page.locator("button[title='Search']")).toHaveAttribute('disabled')
  })
})
