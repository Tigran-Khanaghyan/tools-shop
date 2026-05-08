import { expect, Locator, Page } from "@playwright/test";

export class BasketPage {
  private basketCards: Locator;
  private removeBasketCardButtons: Locator;
  private basketCardPrices: Locator;

  constructor(private page: Page) {
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.removeBasketCardButtons = page.locator(
      '[data-qa="remove-basket-card"]',
    );
    this.basketCardPrices = page.locator('[data-qa="basket-card-price"]');
  }

  removeExpensiveTool = async () => {
    await this.basketCards.first().waitFor();
    const itemsBeforeRemoval = await this.basketCards.count()
    await this.basketCardPrices.first().waitFor();
    const allPriceTexts = await this.basketCardPrices.allInnerTexts();
    const prices = allPriceTexts.map((item) => {
        return parseFloat(item.replace('$', ''))
    })
    const maxNumber = Math.max(...prices)
    const maxNumberIndex = prices.indexOf(maxNumber)
    await this.removeBasketCardButtons.nth(maxNumberIndex).waitFor()
    await this.removeBasketCardButtons.nth(maxNumberIndex).click()
    const itemsAfterRemoval = await this.basketCards.count()
    expect(itemsAfterRemoval).toBe(itemsBeforeRemoval - 1)
  };
}
