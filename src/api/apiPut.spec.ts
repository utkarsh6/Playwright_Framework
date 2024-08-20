import {test,expect} from '@playwright/test'
import { request } from 'https'

test.describe.parallel("API Testing",()=>{
    const base_url="https://reqres.in/api";
    test("PUT User Update User", async({request})=>{
        const response= await request.put(`${base_url}/users/2`,{
        data:{
            name: "Test",
            job: "Teacher"
        },
    })
    const responsebody=JSON.parse(await response.text());
    console.log(responsebody);
    expect(response.status()).toBe(200)
    expect(responsebody.updatedAt).toBeTruthy();        
    })

})
