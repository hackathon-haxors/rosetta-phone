/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')

const app = require('../index')
const db = require('../db')

const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/:userId', () => {
    const codysFirstName = 'Cody'
    const codysLastName = 'DaPug'
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: codysFirstName,
        lastName: codysLastName,
        email: codysEmail
      })
    })

    it('GET /api/users/:userId', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })
  }) // End describe('/api/users')
}) // End describe('User routes')
