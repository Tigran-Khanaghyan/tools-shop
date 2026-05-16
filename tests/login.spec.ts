import test from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";

test("login test and mocking network requests", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.visit();
  await page.pause();
  await loginPage.loginIntoToolshop();
  await page.route("**/*", async (route) => {
    await route.fulfill({
      status: 404,
      contentType: "text/plain",
      body: "Not Found!",
    });
  });
  await page.pause();
});
