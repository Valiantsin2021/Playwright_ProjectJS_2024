class BottomsWomenPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getWomenBottomsPageHeader: () => this.page.getByRole('heading', { name: 'Bottoms' }),
    getWomenBottomsOptionStyle: () => this.page.getByRole('tab', { name: 'Style' }),
    getAriaSelectedWomenBottoms: () => this.page.locator('[aria-selected]'),
    getCategoryInStyle: () => this.page.locator('[aria-hidden="false"] .items>.item'),
    getBottomsCategory: () => this.page.getByText('Category'),
    getBottomsCategoryPants: () => this.page.locator(".filter-options li a[href$='bottoms-women.html?cat=27']"), //getByRole('link', {name: 'Pants'})
    getPantsCategoryLocator: () => this.page.locator('li .filter-value'),
    getBottomsCategoryShorts: () => this.page.locator(".filter-options li a[href$='bottoms-women.html?cat=28']"),
    getShortsCategoryLocator: () => this.page.locator('li .filter-value'),
    getOptionPrice: () => this.page.getByRole('tab', { name: 'Price' }),
    getOptionPriceFilter: () => this.page.locator('.filter-options-content').nth(3),
    getCategoriesStyle: () => this.page.$$("a[href*='style']"),
    getCountItemsInCategoryStyle: category => category.$('span.count'),
    getShoppingOptionsMaterial: () => this.page.locator('.filter-options-title').nth(7),
    getShoppingOptionsMaterialOrganicCotton: () => this.page.getByText('Organic Cotton '),
    getShoppingOptionsPrice: () => this.page.getByRole('tab', { name: 'Price' }),
    getShoppingOptionsPriceSecondSubCategory: () => this.page.locator("a[href$='price=30-40']"),
    getClearAllButton: () => this.page.getByRole('link', { name: 'Clear All' }),
    getWomenBottomsOptionSize: () => this.page.getByRole('tab', { name: 'Size' }),
    getWomenBottomsLocatorsSize: () => this.page.locator('a[href*="women/bottoms-women.html?size"]>div'),
    getSelectCategory: () => this.page.locator('.filter-value'),
    getListViewLink: () => this.page.getByTitle('List').first(),
    getProductsListWrapper: () => this.page.locator('div.products.wrapper'),
    getProductCards: () => this.page.locator('.item.product.product-item')
  }

  async getLocatorInnerText(locator) {
    return await locator.innerText()
  }

  async clickWomenBottomsOptionStyle() {
    await this.locators.getWomenBottomsOptionStyle().click()
  }

  async extractAndCompareItems(receivedResult, expectedItems) {
    const extractedItems = receivedResult.map(item =>
      item
        .replace(/\nitem$/, '')
        .split(' ')
        .slice(0, -1)
        .join(' ')
    )
    const areEqual = JSON.stringify(extractedItems) === JSON.stringify(expectedItems)

    return { extractedItems, areEqual }
  }

  async clickWomenBottomsCategory() {
    await this.locators.getBottomsCategory().click()
  }

  async clickBottomsCategoryPants() {
    await this.locators.getBottomsCategoryPants().click()
  }

  async clickBottomsCategoryShorts() {
    await this.locators.getBottomsCategoryShorts().click()
  }

  async clickOptionPrice() {
    await this.locators.getOptionPrice().click()
  }

  async clickShoppingOptionsMaterial() {
    await this.locators.getShoppingOptionsMaterial().click()
  }

  async clickShoppingOptionsMaterialOrganicCotton() {
    await this.locators.getShoppingOptionsMaterialOrganicCotton().click()
  }

  async clickShoppingOptionsPrice() {
    await this.locators.getShoppingOptionsPrice().click()
  }

  async clickShoppingOptionsPriceSecondSubCategory() {
    await this.locators.getShoppingOptionsPriceSecondSubCategory().click()
  }

  async clickClearAllButton() {
    await this.locators.getClearAllButton().click()
  }

  async clickCategoryStyle(i) {
    const categories = await this.locators.getCategoriesStyle()
    await categories[i].click()
  }

  async clickWomenBottomsOptionSize() {
    await this.locators.getWomenBottomsOptionSize().click()
  }

  async getObjectCategoryStyleByIndex(index) {
    const categories = await this.locators.getCategoriesStyle()
    const category = categories[index]
    const name = await category.textContent()
    const count = await this.locators.getCountItemsInCategoryStyle(category)

    return {
      name: name.replace(/\bitem\b|\d+/g, '').trim(),
      count: parseInt(await count.textContent())
    }
  }

  async clickListViewLink() {
    await this.locators.getListViewLink().click()
  }
}

export default BottomsWomenPage
