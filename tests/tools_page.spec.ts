import test, { expect } from "@playwright/test";

test("Add to basket", async ({ page }) => {
  await page.goto("/");

  const continueWithDemo = page.locator('[data-qa="continue-demo-button"]');
  await continueWithDemo.waitFor();
  await continueWithDemo.click();

  const addToBasketButton = page.locator('[data-qa="product-button"]').first();
  await addToBasketButton.waitFor();
  expect(addToBasketButton).toHaveText("Add to Basket");

  await addToBasketButton.click();
  const navBasketCount = page.locator('[data-qa="nav-basket-count"]');
  await navBasketCount.waitFor();
  expect(navBasketCount).toHaveText("1");

  const navAccount = page.locator('[data-qa="nav-account"]');
  await navAccount.waitFor();
  await navAccount.click();
  await page.waitForURL("/account");
});
