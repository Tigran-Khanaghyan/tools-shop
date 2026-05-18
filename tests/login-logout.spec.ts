import test from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ToolsPage } from '../page-objects/ToolsPage'

test.describe.parallel('Login Logout flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.visit()
  })
  test('Negative scenario: login into page', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.loginIntoToolshop('wrongemail@gmail.com', 'wrongpassword')
    await loginPage.loginErrorElement.waitFor()
    await loginPage.loginErrorElement.isVisible()
  })
  test('Positive scenario: login and logout', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const toolsPage = new ToolsPage(page)
    await loginPage.loginIntoToolshop()
    await toolsPage.toolsShopTitle.waitFor()
    await toolsPage.toolsShopTitle.isVisible()
    await toolsPage.logoutButton.waitFor()
    await toolsPage.logoutButton.isVisible()
    await toolsPage.logoutButton.click()
  })
})
