/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('api/products/', () => {
    beforeEach(() => {
      return Product.create({
        name: 'My Amazing Boots',
        description: 'Statement western style boots with studd detailing',
        price: 100,
        size: '7'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('api/products')
        .expect(200)
        .expect('Content-Type', /json/)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('My Amazing Boots')
      expect(res.body[0].description).to.be.equal(
        'Statement western style boots with studd detailing'
      )
      expect(res.body[0].price).to.be.equal(100)
      expect(res.body[0].size).to.be.equal('7')
    })
  })
})
