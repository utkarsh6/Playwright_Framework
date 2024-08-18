import { Page } from "@playwright/test";
import logger from "../utils/LoggerUtil";
// import { link } from "fs/promises";
// import { error } from "console";

export default class ContactPage{
    private readonly contactLink= "Contacts";
    // private readonly newButtonLocator = 'button[name="NewContact"]';
    private readonly newButtonLocator = 'New';
    private readonly firstNameTextFieldLocator = "First Name";
    private readonly lastNameTextFieldLocator = "Last Name";
    private readonly saveButtonLocator = "Save";
    private readonly conatctNameLocator= ".slds-template__container > .center";
    private readonly userNameAfterCreation="records-highlights2 lightning-formatted-name";


    constructor( private page:Page){}

    async createNewConsumer(fname:string,lname:string){

      // const contactTab= this.page.getByRole('link',{name:this.contactLink});
      // // await this.page.getByRole('button',{name:this.newButtonLocator}).click();
      //   await contactTab.waitFor({ state: 'visible', timeout: 10000 });
        
      //   logger.info("Contacts Tab is visible");
      //   await contactTab.click();
      //   logger.info("Contact button is clicked");
        await this.page.waitForLoadState('domcontentloaded');

        await this.page.getByRole("button",{name: this.newButtonLocator}).click();
        // const newButton = this.page.getByRole(this.newButtonLocator);
        // await newButton.click();
        logger.info("Clicked on New Button");
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(fname);
        logger.info(`First name is filled as ${fname}`)

        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(lname);
        logger.info(`Last name is filled as ${lname}`);

        await this.page.getByRole('button',{name:this.saveButtonLocator,exact:true}).click()
        .catch((error)=>{
            logger.error(`Error clicking Save button: ${error}`);
            throw error;
        }).then (()=>logger.info("Save Button is clicked"));
    }
    async verifyConsumerIsCreated() {        
        try {
          await this.page.locator(this.conatctNameLocator).waitFor();
          await this.page.locator(this.conatctNameLocator).isVisible();
          logger.info("Element with specified title is displayed");
        } catch (error) {
          logger.error(`Error finding or clicking the element: ${error}`);
          throw error; // rethrow the error if needed
        }
      }
}