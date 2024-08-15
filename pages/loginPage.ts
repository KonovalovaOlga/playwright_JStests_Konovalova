import { Locator, Page, expect } from "@playwright/test";

const URL = "/customer/account/login";

export class LoginPage {
  homePagePromoLocator: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  submitButton: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.locator("#maincontent #email");
    this.passwordInput = this.page.locator("#maincontent #pass");
    this.submitButton = this.page.locator(".action.login");
  }

  async verifyPageLoaded() {
    await expect(this.passwordInput).toBeVisible();
  }

  async enterCredentials(credentials: { email: string; password: string }) {
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  static async openViaUrl(page: Page): Promise<LoginPage> {
    await page.goto(URL);
    const loginPage = new LoginPage(page);
    await loginPage.verifyPageLoaded();
    return loginPage;
  }
}
