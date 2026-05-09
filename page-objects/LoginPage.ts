import {  Locator, Page } from "@playwright/test";

export class LoginPage {

    private submitLoginButton: Locator

  constructor(private page: Page) {
    this.submitLoginButton = page.locator('[data-qa="submit-login"]');
  }

}