class GearFitnessPage {
  constructor(page) {
    /**
     * Class constructor for BasePage.
     * @constructor
     * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
     */
    this.page = page
  }

  locators = {
    getGearFitnessEquipmentBreadcrumbsLocator: () => this.page.locator('ul.items'),
    getGearFitnessListModeLocator: () => this.page.locator('#mode-list').first(),
    getGearFitnessGridModeLocator: () => this.page.locator('#mode-grid').first(),
    getGearFitnessAmountOfItemsLocator: () => this.page.locator('.toolbar-amount').nth(1)
  }

  async hoverGearFitnessListMode() {
    await this.locators.getGearFitnessListModeLocator().hover()

    return this.page
  }

  async clickGearFitnessListMode() {
    await this.locators.getGearFitnessListModeLocator().click()

    return this.page
  }
}

export default GearFitnessPage
