import * as base from '@playwright/test'
import AccountPage from './account-po/accountPO'
import AuthPage from './auth-po/authPO'
import CartPage from './cart-po/cartPO'
import NavigationPage from './navigation-po/navigationPO'
import ShopPage from './shop-po/shopPO'
/**
 * @typedef {object} PagesTestArgs - HomePage test args
 * @property {AuthPage} authPage     - AuthPage
 * @property {AccountPage} accountPage     - AccountPage
 * @property {CartPage} cartPage     - CartPage
 * @property {NavigationPage} navigationPage     - NavigationPage
 * @property {ShopPage} shopPage     - ShopPage
 *
 */
/** @type {base.Fixtures<PagesTestArgs, {}, base.PlaywrightTestArgs, base.PlaywrightWorkerArgs>} */
const extension = {
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page))
  },
  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page))
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page))
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page))
  }
}
export const test = base.test.extend(extension)
export { expect } from '@playwright/test'
