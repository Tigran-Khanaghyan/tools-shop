import { expect, Locator, Page } from "@playwright/test";

export class ToolsPage {
  private addButtons: Locator;
  private basketCounter: Locator;

  constructor(private page: Page) {
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.basketCounter = page.locator('[data-qa="nav-basket-count"]');
  }

  visit = async () => {
    await this.page.goto("/");
    const continueWithDemo = this.page.locator(
      '[data-qa="continue-demo-button"]',
    );
    await continueWithDemo.waitFor();
    await continueWithDemo.click();
    await this.page.goto("/tools");
  };

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text);
  };

  addToolToBasket = async (index: number) => {
    await this.addButtons.nth(index).waitFor();
    await expect(this.addButtons.nth(index)).toHaveText("Add to Basket");
    const basketCountBeforAdding = await this.getBasketCount();
    await this.addButtons.nth(index).click();
    await expect(this.addButtons.nth(index)).toHaveText("Add More");
    const basketCountAfterAdding = await this.getBasketCount();
    expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforAdding);
  };
}
