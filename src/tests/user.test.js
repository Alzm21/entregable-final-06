const request = require("supertest");
const app = require('../app')

const BASE_URL = '/api/v1/users'
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
afterAll()

test("POST -> 'BASE_URL', shoult return status code 201, res.body.firstName === user.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(user)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

test("GET -> 'BASE_URL', should return status code 200, res.body.length === ?", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
})