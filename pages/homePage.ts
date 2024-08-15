import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  static url = "/";

  homePagePromoLocator: Locator;

  constructor(private page: Page) {
    this.homePagePromoLocator = this.page.locator(".block-promo.home-main");
  }

  static async openViaUrl(page: Page): Promise<HomePage> {
    await page.goto(this.url);
    const homePage = new HomePage(page);
    homePage.verifyPageLoaded();
    return homePage;
  }

  async verifyPageLoaded() {
    await expect(this.homePagePromoLocator).toBeVisible();
  }
}
