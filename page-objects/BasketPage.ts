import { expect, Locator, Page } from "@playwright/test";

export class BasketPage {
  private basketCards: Locator;
  private removeBasketCardButtons: Locator;
  private basketCardPrices: Locator;
  private proceedToPaymentButton: Locator;

  private cardholderNameInput: Locator;
  private cardNumberInput: Locator;
  private expiryInput: Locator;
  private cvvInput: Locator;
  private billingAddressInput: Locator;
  private submitPaymentButton: Locator;

  constructor(private page: Page) {
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.removeBasketCardButtons = page.locator(
      '[data-qa="remove-basket-card"]',
    );
    this.basketCardPrices = page.locator('[data-qa="basket-card-price"]');
    this.proceedToPaymentButton = page.locator(
      '[data-qa="proceed-to-payment"]',
    );

    this.cardholderNameInput = page.locator('[data-qa="cardholder-name"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.expiryInput = page.locator('[data-qa="expiry"]');
    this.cvvInput = page.locator('[data-qa="cvv"]');
    this.billingAddressInput = page.locator('[data-qa="billing-address"]');
    this.submitPaymentButton = page.locator('[data-qa="submit-payment"]');
  }

  removeExpensiveTool = async () => {
    await this.basketCards.first().waitFor();
    const itemsBeforeRemoval = await this.basketCards.count();
    await this.basketCardPrices.first().waitFor();
    const allPriceTexts = await this.basketCardPrices.allInnerTexts();
    const prices = allPriceTexts.map((item) => {
      return parseFloat(item.replace("$", ""));
    });
    const maxNumber = Math.max(...prices);
    const maxNumberIndex = prices.indexOf(maxNumber);
    await this.removeBasketCardButtons.nth(maxNumberIndex).waitFor();
    await this.removeBasketCardButtons.nth(maxNumberIndex).click();
    const itemsAfterRemoval = await this.basketCards.count();
    expect(itemsAfterRemoval).toBe(itemsBeforeRemoval - 1);
  };

  proceedToPayment = async () => {
    await this.proceedToPaymentButton.waitFor();
    await this.proceedToPaymentButton.click();
  };

  secureCheckout = async () => {
    await this.cardholderNameInput.waitFor();
    await this.cardholderNameInput.fill("Tigran Khanaghyan");

    await this.cardNumberInput.waitFor();
    await this.cardNumberInput.fill("1234567890123456");

    await this.expiryInput.waitFor();
    await this.expiryInput.fill("0829");

    await this.cvvInput.waitFor();
    await this.cvvInput.fill("555");

    await this.billingAddressInput.waitFor();
    await this.billingAddressInput.fill("Armenia");

    await this.submitPaymentButton.waitFor();
    await this.submitPaymentButton.click();
  };
}
