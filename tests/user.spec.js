import * as request from 'supertest'
import database from "../prisma.js";
import app from "../server.js";


const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6NCwidG9rZW5JZCI6N30sImlhdCI6MTcwMDk5NjU5OCwiZXhwIjoxNzAxMDgyOTk4fQ.g11au5_pD3qqmwwPZF81FNx6D0sPjcGD9VnK7BiDrv8`

describe("Test /api/v1/user", async ()=>{
    test("should return all users", async ()=>{
        return request(app).get("api/v1/user").set("Auth",`Bearer ${token}`).expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.statusCode).toBe(200);
        })
    })
})