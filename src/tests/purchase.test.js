require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')

const BASE_URL = '/api/v1/purchase'
const BASE_URL_USERS = '/api/v1/users/login'

let TOKEN, userId, prodBody, product, cartBody

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
        quantity: 3,
        productId: product.id,
        userId: res.body.id
    }

    await request(app)
        .post('/api/v1/cart')
        .send(cartBody)
        .set("Authorization", `Bearer ${TOKEN}`)

})

afterAll(async() => {
    await product.destroy()
})

test("POST 'BASE_URL', should return status code 201 and res.body.quantity === bodyCart.quantity", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(cartBody)
        .set("Authorization", `Bearer ${TOKEN}`)
  
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body[0].quantity).toBe(cartBody.quantity)
  
  })
  
  test("GET -> 'BASE_URL',should return status code 200 res.body.length === 1", async () => {
  
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
  
  })