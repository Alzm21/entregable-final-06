const request = require("supertest");
const app = require('../app')

const BASE_URL = '/api/v1/categories'
const BASE_URL_LOGIN = '/api/v1/users/login'
let TOKEN
let categoryId

beforeAll(async () => {
    const user = {
        email: "armandocarpas@email.com",
        password: "armando1234"
    }

    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user)

    TOKEN = res.body.token
})

test("POST -> 'BASE_URL', should return status code 201 and res.body.name === category.name", async () => {
    const category = {
        name: 'Whatever'
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`)

    categoryId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

test("GET -> 'BASE_URL', should return status code 200, res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    /* console.log(res.body) */
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})