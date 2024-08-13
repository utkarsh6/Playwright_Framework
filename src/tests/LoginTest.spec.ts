import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptoUtils";
import * as dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded


test('LoginTest', async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.navigateToLoginPage();
    // await loginpage.fillUsername("utkarsh.kumar97-8d8x@force.com");
    // await loginpage.fillPassword("ueyey");


    await loginpage.fillUsername(decrypt(process.env.userid!));
    await loginpage.fillPassword(decrypt(process.env.password!));


    // Decrypt the username and password
    // const decryptedUserId = decrypt(process.env.userid!);
    // const decryptedPassword = decrypt(process.env.password!);

    // // Print the decrypted values for debugging
    // console.log(`Decrypted UserId: ${decryptedUserId}`);
    // console.log(`Decrypted Password: ${decryptedPassword}`);

    // await loginpage.fillUsername(decryptedUserId);
    // await loginpage.fillPassword(decryptedPassword);

    const homePage = await loginpage.clickLogin();
    await homePage.expectSalesTitleBeDisplayed();
})



