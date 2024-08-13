import {Page,expect} from '@playwright/test'
import HomePage from './HomePage';

export default class LoginPage {
    private readonly userNameInputSelector= "#username";
    private readonly passwordInputSelector="#password";
    private readonly loginBtn="#Login";


    constructor(private page: Page) {       
    }

    async navigateToLoginPage(){
        await this.page.goto("/")
    }

    async fillUsername(userName: string){
        await this.page.locator(this.userNameInputSelector).fill(userName)
    }
    async fillPassword(pwd: string){
        await this.page.locator(this.passwordInputSelector).fill(pwd)
    }

    
    async clickLogin(){
        await this.page.locator(this.loginBtn).click().catch((error)=>{
            console.log(`The error is:${error}`);
            throw error;
        });
        const homePage= new HomePage(this.page);
        return homePage;
        
    }

  
    
}