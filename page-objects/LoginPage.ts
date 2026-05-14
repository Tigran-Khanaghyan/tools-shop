import {  Locator, Page } from "@playwright/test";

export class LoginPage {
  private submitLoginButton: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;

  constructor(private page: Page) {
    this.submitLoginButton = page.locator('[data-qa="submit-login"]');
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
  }

  visit = async () => {
    await this.page.goto("/");
    await this.page.waitForURL("/login");
  };

  loginIntoToolshop = async () => {
    await this.emailInput.waitFor();
    await this.emailInput.fill("admin@gmail.com");

    await this.passwordInput.waitFor();
    await this.passwordInput.fill("admin1234");

    await this.submitLoginButton.waitFor();
    await this.submitLoginButton.click();
  };
}