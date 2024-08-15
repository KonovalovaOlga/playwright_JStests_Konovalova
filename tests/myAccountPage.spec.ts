import { test } from "@playwright/test";
import { registerAndLoginAsANewUser } from "../actions/loginActions";
import { AccountPage } from "../pages/accountPage";

test(
  "I can see my name on the account page",
  { tag: ["@account", "@regressions"] },
  async ({ page, request }) => {
    const user = await registerAndLoginAsANewUser({ request, page });
    const accountPage = await AccountPage.openViaUrl(page);
    await accountPage.verifyCorrectNameIsDisplayed(user);
  }
);
