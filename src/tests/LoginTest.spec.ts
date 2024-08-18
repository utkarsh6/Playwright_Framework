import { test ,expect} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptoUtils";
import  logger  from "../utils/LoggerUtil";
import * as dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

const authFile= "src/config/auth.json";


test('LoginTest', async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.navigateToLoginPage();
    await loginpage.fillUsername(decrypt(process.env.userid!));
    await loginpage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginpage.clickLogin();
    await homePage.expectSalesTitleBeDisplayed();
    logger.info("Login Test Completed");
    await page.context().storageState({path: authFile});
})


test.skip("Login with auth file", async ({ browser }) => {
    const context = await browser.newContext({ storageState: authFile });
    const page = await context.newPage();
    await page.goto(
      "https://ability-inspiration-590.lightning.force.com/lightning/page/home"
    );
    await expect(page.getByRole("link", { name: "Accounts" })).toBeVisible();
  });
  



