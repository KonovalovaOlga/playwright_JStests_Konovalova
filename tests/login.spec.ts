import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { HeaderComponent } from "../components/headerComponent";
import { LoginPage } from "../pages/loginPage";
import { registerUserViaApi } from "../api/customerApi";
import { generateValidUserData } from "../helpers/dataHelper";

test("user is able to log in from the home page", async ({ page, request }) => {
  const user = generateValidUserData();
  await registerUserViaApi(request, user);

  const homePage = await HomePage.openViaUrl(page);
  const headerComponent = new HeaderComponent(page);
  await headerComponent.verifyComponentLoaded();
  await headerComponent.clickOnLoginLink();
  const loginPage = new LoginPage(page);
  await loginPage.verifyPageLoaded();
  await loginPage.enterCredentials(user);
  await loginPage.submitForm();
  await homePage.verifyPageLoaded();
  await headerComponent.verifyLoggedIn();
});
