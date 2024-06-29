require('../models')
const request = require("supertest");
const app = require('../app');
const Category = require('../models/Category');

const BASE_URL = '/api/v1/products'
const BASE_URL_USERS = '/api/v1/users'

let TOKEN, productId, product, category

beforeAll(async () => {
    const user = {
        email: "armandocarpas@email.com",
        password: "armando1234"
    }
    const res = await request(app)
        .post(`${BASE_URL_USERS}/login`)
        .send(user)

    TOKEN = res.body.token

    const categoryBody = {
        name: "PC components"
    }

    category = await Category.create(categoryBody)

    product = {
        title: "Cooler Fan",
        description: "This cooler fan is for refrigerate your pc components",
        price: 10.99,
        categoryId: category.id 
    }
})

test("POST -> 'BASE_URL', should return res status code 201, and res.body.title === product.title", async () => {
    
    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title === product.title)
})

test("GET -> 'BASE_URL', should return status code 200 and res.body.length === 1 and res.body[0].category.id === category.id", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0]).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)
})

test("GET -> 'BASE_URL', should return status code 200 and res.body.title === product.title", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${productId}`)
        
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

    expect(res.body.category).toBeDefined()
    expect(res.body.category.id).toBe(category.id)

})

test("PUT -> 'BASE_URL/:id', should resturn status code 200 and res.body.title = productUpdate.title", async () => {

    const productUpdate = {
      title: "GTX 4090 gpu",
    }
  
    const res = await request(app)
      .put(`${BASE_URL}/${productId}`)
      .send(productUpdate)
      .set("Authorization", `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(productUpdate.title)
  
  })
  
  test("DELET -> 'BASE_URL/:id', should resturn status code 204", async () => {
  
    const res = await request(app)
      .delete(`${BASE_URL}/${productId}`)
      .set("Authorization", `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(204)
    await category.destroy()
  })