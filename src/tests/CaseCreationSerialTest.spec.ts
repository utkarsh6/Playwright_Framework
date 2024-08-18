import {test,Page} from "@playwright/test";

import logger from "../utils/LoggerUtil";
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptoUtils";
import ContactPage from "../pages/ContactPage";
import cdata from "../testdata/contacts.json";
import CasePage from "../pages/CasePage";
import HomePage from "../pages/HomePage";



test.describe.configure({ mode: "serial" });
let page: Page;

    
    test.beforeEach('Login ', async({browser}) => {  
        // page = await browser.newPage();
        const context = await browser.newContext();
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        loginPage.navigateToLoginPage();
        await loginPage.fillUsername(decrypt(process.env.userid!));
        await loginPage.fillPassword(decrypt(process.env.password!));       
        const homePage= await loginPage.clickLogin();
        homePage.expectSalesTitleBeDisplayed();
    })

    for (const [index, contact] of cdata.entries()) {
        test(`Create consumer - ${contact.firstName} ${contact.lastName} (${index + 1})`, async () => {
            const contactPage = new ContactPage(page);
            const homePage = new HomePage(page);
            await homePage.navigateToContactTab();
            await contactPage.createNewConsumer(contact.firstName, contact.lastName);
            await page.waitForLoadState('networkidle'); // Wait for the page to be idle
            const casePage = new CasePage(page);
            await casePage.createNewCase();

        });

    
    
    }
    test.afterEach(async ({page}) => {

        await page.reload(); 
    });
    
    test.afterAll(async () => {
      
            await page.close();
      
    });
      


    

     

    