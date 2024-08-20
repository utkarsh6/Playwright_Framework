import {test,expect} from '@playwright/test'
import { request } from 'https'

test.describe.parallel("API Testing",()=>{
    const base_url="https://reqres.in/api";
    test("Delete", async({request})=>{
        const response= await request.delete(`${base_url}/users/2`,{

    })
    expect(response.status()).toBe(204)
     
    })

})

