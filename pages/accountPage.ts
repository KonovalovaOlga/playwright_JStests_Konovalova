import { Locator, Page, expect } from "@playwright/test";

const URL = "/customer/account/";

export class AccountPage {
  nameAndEmail: Locator;

  constructor(private page: Page) {
    this.nameAndEmail = this.page.locator(".block-dashboard-info .box-content");
  }

  async verifyPageLoaded() {
    await expect(this.nameAndEmail).toBeVisible();
  }

  async verifyCorrectNameIsDisplayed({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) {
    await expect(this.nameAndEmail).toContainText(`${firstName} ${lastName}`);
  }

  static async openViaUrl(page: Page): Promise<AccountPage> {
    await page.goto(URL);
    const accountPage = new AccountPage(page);
    await accountPage.verifyPageLoaded();
    return accountPage;
  }
}
