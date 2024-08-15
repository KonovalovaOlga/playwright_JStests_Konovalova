import { APIRequestContext, Page } from "@playwright/test";
import { registerUserViaApi } from "../api/customerApi";
import { generateValidUserData } from "../helpers/dataHelper";
import { LoginPage } from "../pages/loginPage";
import { HeaderComponent } from "../components/headerComponent";

export const registerAndLoginAsANewUser = async ({
  request,
  page,
}: {
  request: APIRequestContext;
  page: Page;
}) => {
  const user = generateValidUserData();
  await registerUserViaApi(request, user);

  const loginPage = await LoginPage.openViaUrl(page);
  await loginPage.verifyPageLoaded();
  await loginPage.enterCredentials(user);
  await loginPage.submitForm();
  const headerComponent = new HeaderComponent(page);
  await headerComponent.verifyLoggedIn();
  return user;
};
