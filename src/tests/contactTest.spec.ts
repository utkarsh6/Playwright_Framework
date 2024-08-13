import {test} from "@playwright/test";
import cdata from "../testdata/contacts.json";
import logger from "../utils/LoggerUtil";
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptoUtils";
import * as dotenv from 'dotenv';
import HomePage from "../pages/HomePage";
import { exportToCsv, exportToJson, generateTestData } from "../utils/FakerDataUtils";
import { convertCsvFileToJsonFile } from "../utils/CsvToJSONUtil";

dotenv.config(); 


for( const contact of cdata){
    
    test(`DD Test for ${contact.firstName}`, async({page}) => {  
        logger.info("Test for contact creation started");
        const loginPage= new LoginPage(page);
        loginPage.navigateToLoginPage();
        await loginPage.fillUsername(decrypt(process.env.userid!));
        await loginPage.fillPassword(decrypt(process.env.password!));
        
        const homePage= await loginPage.clickLogin();
        homePage.expectSalesTitleBeDisplayed();
        const contactPage=await homePage.navigateToContactTab();
        
        await contactPage.createNewConsumer(contact.firstName,contact.lastName);
        await contactPage.verifyConsumerIsCreated();
    })
    test.afterEach(async ({ page }) => {

        await page.reload(); 
    });

}

test.skip("csv to json",async () => {
    convertCsvFileToJsonFile("data.csv","datademo.json")
})


test.skip("Faker", async ({ page }) => { 

    // Generate test data
  const testData = generateTestData(20);
  
  // Export data to JSON file
  exportToJson(testData, 'testData_en.json');
  
  // Export data to CSV file
  exportToCsv(testData, 'testData_en.csv');
  
   });