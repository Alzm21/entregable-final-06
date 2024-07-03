require('../models')
const request = require('supertest')
const app = require('../app')
const path = require('path')

const BASE_URL = '/api/v1/product_images'
const BASE_URL_USERS = '/api/v1/users/login'

let TOKEN, imageId

beforeAll(async () => {
    const user = {
        email: "armandocarpas@email.com",
        password: "armando1234"
    }
    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(user)

    TOKEN = res.body.token
})

test("POST -> 'BASE_URL', should return status code 201 and res.body.url, res.body.filename to be defined", async () => {
    
    const localImage = path.join(__dirname, 'createData', 'imageTest.jpg')
    const res = await request(app)
        .post(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)
        .attach('img', localImage)

    imageId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body.url).toBeDefined()
    expect(res.body.filename).toBeDefined()
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${imageId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})

