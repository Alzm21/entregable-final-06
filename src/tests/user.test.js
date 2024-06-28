const request = require("supertest");
const app = require('../app')

const BASE_URL = '/api/v1/users'
let userId
let TOKEN

beforeAll( async () => {
    const body = {
        email: "armandocarpas@email.com",
        password: "armando1234"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(body)

    TOKEN = res.body.token
})


test("POST -> 'BASE_URL', shoult return status code 201, res.body.firstName === user.firstName", async () => {
    const user = {
        firstName: "Alvaro",
        lastName: "Zuna",
        email: "alvaro@email.com",
        password: "alvaro1234",
        phone: "75162858"
    }

    
    const res = await request(app)
    .post(BASE_URL)
    .send(user)
    
    userId = res.body.id
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

test("GET -> 'BASE_URL', should return status code 200, res.body.length === 2", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)

})

test("PUT -> 'BASE_URL/:id', should return status code 200, res.body.firstName === userUpdate.firstName", async () => {
    const userUpdate = {
        firstName: "Diomedes"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(userUpdate)

        // console.log(res.body)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(userUpdate.firstName)
})

test("POST -> 'BASE_URL/:id', should return status code 401", async () => { //for error
    const body = {
        email: "alvaro@email.com",
        password: "a1232313534dfsfds4"
    }
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(body)

    expect(res.statusCode).toBe(401)
})

test("POST -> 'BASE_URL/login', should return status code 200, res.body.user to be defined,res.body.toke to be defined and res.body.user.email === body.email", async () => {
    const body = {
        email: "alvaro@email.com",
        password: "alvaro1234"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(body)

    /* console.log(res.body) */
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user).toBeDefined()
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe(body.email)
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})
