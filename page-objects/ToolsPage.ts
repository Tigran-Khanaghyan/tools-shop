import { Locator, Page } from "@playwright/test";



export class ToolsPage {

  private addButtons: Locator

  constructor(private page: Page) {
    this.page = page;
    this.addButtons = page.locator('[data-qa="product-button"]')
  }

  visit = async () => {
     await this.page.goto("/")
    const continueWithDemo = this.page.locator(
      '[data-qa="continue-demo-button"]',
    );
    await continueWithDemo.waitFor();
    await continueWithDemo.click();
    await this.page.goto("/tools");
  };

  addToolToBasket = async (index : number) => {
    await this.addButtons.nth(index).waitFor()
    await this.addButtons.nth(index).click()
  }
}
