import { test } from "../fixtures/loginFixtures";

test("Fixture test", async ({ homePage }) => {
  await homePage.expectSalesTitleBeDisplayed();
});