import { expect, Page } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class ClassPage{
    private readonly caseLink= "Cases (0)";

    private readonly NewCasesBtn= "New";
    private readonly CaseOriginDropdown=  "Case Origin";
    private readonly StatusDropdown= 'Status';
    private readonly  CaseCreationSuccessMsg="lightning-icon";


    private readonly saveButtonLocator = "Save";

    constructor (private page:Page){}

    async createNewCase(){
        logger.info("Clicking over Cases link");
        await this.page.getByRole('link', { name: this.caseLink }).click();
        logger.info("Clicked over Cases link");
        await this.page.getByRole('button',{name:this.NewCasesBtn}).click();
        logger.info("Click on New cases");
        await this.page.getByRole('combobox', { name: this.CaseOriginDropdown }).click();
        await this.page.getByRole('option', { name: 'Email' }).locator('span').nth(1).click();
 

      logger.info("Selected  option in the Case Origin dropdown");
      await this.page.getByRole('button',{name: this.saveButtonLocator,exact:true}).click();
      logger.info("Save button is clicked");
      } 


    async verifyCaseIsCreated() {        
        try {
          await this.page.locator(this.CaseCreationSuccessMsg).waitFor();
          await this.page.locator(this.CaseCreationSuccessMsg).isVisible();
          logger.info("Element with specified title is displayed");
        } catch (error) {
          logger.error(`Error finding or clicking the element: ${error}`);
          throw error; 
        }
        
      }
}