import test from "@playwright/test";
import { ToolsPage } from "../page-objects/ToolsPage";

test.only("New user end-to-end test", async ({page}) => {
    const toolsPage = new ToolsPage(page)
    await toolsPage.visit();
    await toolsPage.addToolToBasket(0);
    await toolsPage.addToolToBasket(1);
    await toolsPage.addToolToBasket(2);
})