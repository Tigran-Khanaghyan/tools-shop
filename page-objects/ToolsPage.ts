import { expect, Locator, Page } from "@playwright/test";
import { Navigation } from "./Navigation";

const isDesktopViewport = (page: Page): boolean => {
  const size = page.viewportSize();
  return (size?.width ?? 0) >= 600;
};

export class ToolsPage {
  private addButtons: Locator;
  private powerToolsFilterButton: Locator;
  private toolTitles: Locator;

  constructor(private page: Page) {
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.powerToolsFilterButton = page.locator('[data-qa="power_tools"]');
    this.toolTitles = page.locator('[data-qa="tool-title"]');
  }

  visit = async () => {
    const isDesktop = isDesktopViewport(this.page);
    if (isDesktop) {
      console.log("You are using desktop application");
    }
    await this.page.goto("/tools");
  };

  addToolToBasket = async (index: number) => {
    await this.addButtons.nth(index).waitFor();
    await expect(this.addButtons.nth(index)).toHaveText("Add to Basket");
    const navigation = new Navigation(this.page);
    const basketCountBeforAdding = await navigation.getBasketCount();
    await this.addButtons.nth(index).click();
    await expect(this.addButtons.nth(index)).toHaveText("Add More");
    const basketCountAfterAdding = await navigation.getBasketCount();
    expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforAdding);
  };

  sortByPowerTools = async () => {
    await this.powerToolsFilterButton.waitFor();
    const toolsTitlesBeforeFiltering = await this.toolTitles.allInnerTexts();
    await this.powerToolsFilterButton.click();
    const toolsTitlesAfterFiltering = await this.toolTitles.allInnerTexts();
    expect(toolsTitlesAfterFiltering).not.toEqual(toolsTitlesBeforeFiltering);
  };
}
