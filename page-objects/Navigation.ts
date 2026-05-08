import {Locator, Page} from "@playwright/test"

export class Navigation {
      private basketCounter: Locator;
    
      constructor(private page: Page) {
        this.basketCounter = page.locator('[data-qa="nav-basket-count"]');
      }

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text);
  };
}