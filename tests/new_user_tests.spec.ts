import test from "@playwright/test";
import { ToolsPage } from "../page-objects/ToolsPage";
import { Navigation } from "../page-objects/Navigation";
import { BasketPage } from "../page-objects/BasketPage";

test.only("New user end-to-end test", async ({ page }) => {
  const toolsPage = new ToolsPage(page);
  await toolsPage.visit();
  await toolsPage.sortByPowerTools();
  await toolsPage.addToolToBasket(0);
  await toolsPage.addToolToBasket(1);
  await toolsPage.addToolToBasket(2);

  const navigation = new Navigation(page);
  await navigation.goToBasketPage();
  
  const basketPage = new BasketPage(page);
  await basketPage.removeExpensiveTool();
  await basketPage.proceedToPayment();
  await basketPage.secureCheckout();

});