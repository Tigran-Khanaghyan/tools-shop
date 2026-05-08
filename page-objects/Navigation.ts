import { Locator, Page } from "@playwright/test";

export class Navigation {
  private basketCounter: Locator;
  private basketNav: Locator;

  private basketCards: Locator;
  private removeBasketCardButtons: Locator;
  private basketCardPrices: Locator;

  constructor(private page: Page) {
    this.basketCounter = page.locator('[data-qa="nav-basket-count"]');
    this.basketNav = page.locator('[data-qa="nav-basket"]');

    this.basketCards = page.locator('[dat-qa="basket-card"]');
    this.removeBasketCardButtons = page.locator(
      '[data-qa="remove-basket-card"]',
    );
    this.basketCardPrices = page.locator('[dat-qa="basket-card-price"]');
  }

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text);
  };

  goToBasketPage = async () => {
    await this.basketNav.waitFor();
    await this.basketNav.click();
    await this.page.waitForURL("/basket");
  };
}
