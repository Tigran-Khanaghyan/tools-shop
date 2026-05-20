import { Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  private submitLoginButton: Locator
  private emailInput: Locator
  private passwordInput: Locator
  public loginErrorElement: Locator

  constructor(readonly page: Page) {
    super(page)
    this.submitLoginButton = page.locator('[data-qa="submit-login"]')
    this.emailInput = page.locator('[data-qa="login-email"]')
    this.passwordInput = page.locator('[data-qa="login-password"]')
    this.loginErrorElement = page.locator('[data-qa="login-error"]')
  }

  visit = async () => {
    await this.page.goto('/')
    await this.page.waitForURL('/login')
  }

  loginIntoToolshop = async (email = 'admin@gmail.com', password = 'admin1234') => {
    await this.emailInput.waitFor()
    await this.emailInput.fill(email)

    await this.passwordInput.waitFor()
    await this.passwordInput.fill(password)

    await this.submitLoginButton.waitFor()
    await this.submitLoginButton.click()
  }
}
