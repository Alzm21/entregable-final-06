require('../models')

const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')

const BASE_URL = '/api/v1/cart'
const BASE_URL_USERS = '/api/v1/users/login'

let TOKEN, prodBody, cartBody, product, userId, cartId

beforeAll(async () => {
    const user = {
        email: "armandocarpas@email.com",
        password: "armando1234"
    }
    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id

    prodBody = {
        title: "Cooler Fan",
        description: "This cooler fan is for refrigerate your pc components",
        price: 10.99
    }
    product = await Product.create(prodBody)
    
    cartBody = {
        quantity: 5,
        productId: product.id
    }
})
afterAll(async () => {
    await product.destroy()
})

test("POST -> 'BASE_URL', should return res status code 201 and res.body.quantity === cart.quantity", async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(cartBody)
        .set("Authorization", `Bearer ${TOKEN}`)

    cartId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cartBody.quantity)
    expect(res.body.userId).toBe(userId)
})

test("GET -> 'BASE_URL', should return res status code 200, res.body.length === 1", async() => {
    const res = await request(app)
        .get(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].userId).toBeDefined()
    expect(res.body[0].userId).toBe(userId)

    expect(res.body[0].product).toBeDefined()
    expect(res.body[0].productId).toBe(product.id)
    expect(res.body[0].product.id).toBe(product.id)

})
 
test("GET -> 'BASE_URL/:id', should return status code 200, res.body.quantity === cart.quantity", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${cartId}`)
        .set("Authorization", `Bearer ${TOKEN}`) 

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cartBody.quantity)

    expect(res.body.product).toBeDefined()
    expect(res.body.productId).toBe(product.id)
    expect(res.body.product.id).toBe(product.id)

})

test("PUT -> 'BASE_URL/:id', should return status code 200, res.body.quantity === cart.quantity and res.body.quantity === cartUpdate", async () => {
    const cartUpdate = {
        quantity: 2
    }
    const res = await request(app)
        .put(`${BASE_URL}/${cartId}`)
        .send(cartUpdate)
        .set("Authorization", `Bearer ${TOKEN}`)

    /* console.log(res.body) */

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cartUpdate.quantity)
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    
    const res = await request(app)
        .delete(`${BASE_URL}/${cartId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})