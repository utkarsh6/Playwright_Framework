import {test,expect} from "@playwright/test"

test.skip ("API test with context", async ({page}) => {

    const context= page.request;
    const response= await (await context.get("/api/users?page=2")).json();
    console.log(response);
    expect(typeof response.page).toBe("number");
  expect(response.page).toEqual(2);

  expect(typeof response.per_page).toBe("number");
  expect(response.per_page).toEqual(6);

  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toEqual(6);

  expect(typeof response.support).toBe("object");
  expect(typeof response.support.url).toBe("string");
  expect(typeof response.support.text).toBe("string");    
})

test("Api with context",async ({playwright}) => {
      const apirequest = playwright.request;

  const newcontext = await apirequest.newContext({
    baseURL: "https://cat-fact.herokuapp.com",
  });

  
  const apiResponse = await newcontext.get("/facts/");
  const apiResponseJson = await apiResponse.json();
  console.log(apiResponseJson);
  for (const obj of apiResponseJson) {
    // Assert properties of each object
    expect(obj).toHaveProperty("_id");
  
    // Specific assertions for nested properties
    expect(obj.status).toHaveProperty("verified");
    expect(obj.status).toHaveProperty("sentCount");

    // Example assertions for specific values
    expect(obj.status.verified).toBe(true);
    expect(obj._id).toMatch(/^\w{24}$/); // Matches ObjectId format
    expect(obj.user).toMatch(/^\w{24}$/); // Matches ObjectId format
    expect(obj.text).toContain("cat");
    expect(obj.source).toBe("user");
    expect(obj.deleted).toBe(false);

  }
})