import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

module.exports = defineConfig({
  testDir: './tests/testsPOM',
  testMatch: '**/*.spec.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  expect: {
    timeout: 15000
  },
  reporter: [
    ['html'],
    ['list'],
    [
      'allure-playwright',
      {
        detail: true,
        resultsDir: './report/allure-results',
        suiteTitle: true,
        environmentInfo: {
          Environment: process.env.ENV,
          User: process.env.USER,
          NodeJS_version: process.version,
          OS: process.platform
        }
      }
    ]
  ],
  timeout: 60000,

  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    baseURL: 'https://magento.softwaretestingboard.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'UI_tests',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
