import {test,expect} from '@playwright/test'
import { request } from 'https'

test.describe.parallel("API Testing",()=>{
    const base_url="https://reqres.in/api";
    test("Post Request Create New user", async({request})=>{
        const response= await request.post(`${base_url}/users`,{
        data:{
            id: 1000,
        },
    })
    const responsebody=JSON.parse(await response.text());
    console.log(responsebody);
    expect(responsebody.id).toBe(1000)
    expect(responsebody.createdAt).toBeTruthy();        
    })

    test("Post Request-Login", async({request})=>{
        const response= await request.post(`${base_url}/login`,{
        data:{
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        },
    })
    const responsebody=JSON.parse(await response.text());
    console.log(responsebody);
    expect(response.status()).toBe(200)
    expect(responsebody.token).toBeTruthy();     
    })

    test("Post Request-LoginFail", async({request})=>{
        const response= await request.post(`${base_url}/login`,{
        data:{
            email: "peter@klaven",
        },
    })
    const responsebody=JSON.parse(await response.text());
    console.log(responsebody);
    expect(response.status()).toBe(400);     
    expect(responsebody.error).toBe("Missing password"); 
    })

})
