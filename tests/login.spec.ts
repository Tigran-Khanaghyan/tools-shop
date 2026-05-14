import test from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";

test.only("My account using cookie injection", async ({page}) => {
     const loginPage = new LoginPage(page)
     await loginPage.visit()
     await loginPage.loginIntoToolshop()

})