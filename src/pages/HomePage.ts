import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import ContactPage from "./ContactPage";

export default class HomePage {

    private readonly SalesTitleLocator= "Sales";
    private readonly contactsLinkLocator = "Contacts";

  constructor(private page: Page) {}

  async expectSalesTitleBeDisplayed(){
    await this.page.waitForLoadState('domcontentloaded'); // Ensure the page is fully loaded
    await this.page.waitForSelector(`[title=${this.SalesTitleLocator}]`, { timeout: 15000 }); // Wait for the element to be present
    await expect(this.page.locator(`[title="${this.SalesTitleLocator}"]`)).toBeVisible({ timeout: 15000 });
  }
  async navigateToContactTab(){

    await expect(this.page.getByRole('link', { name: this.contactsLinkLocator })).toBeVisible();
    logger.info("Contacts Tab is visible")
    await this.page.getByRole('link', { name: this.contactsLinkLocator }).click();
    logger.info("Contacts Tab is clicked")
    return new ContactPage(this.page);
    
  }

}
