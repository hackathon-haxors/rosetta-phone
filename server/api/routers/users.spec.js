/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')

const app = require('../../index')
const db = require('../../db')

const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/:googleId', () => {
    const codysGoogleId = '111111111111111111111'
    const codysEmail = 'cody@puppybook.com'
    const codysFirstName = 'Cody'
    const codysLastName = 'DaPug'
    const codysFullName = 'Cody DaPug'
    const codysImgUrl =
      'https://vetstreet.brightspotcdn.com/dims4/default/354d0cf/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fdc%2Fc4%2F8ccd3a28438d81b2f2f5d8031a05%2Fpug-ap-r82p3q-645.jpg'

    beforeEach(() => {
      return User.create({
        googleId: codysGoogleId,
        email: codysEmail,
        firstName: codysFirstName,
        lastName: codysLastName,
        fullName: codysFullName,
        imgUrl: codysImgUrl
      })
    })

    it('GET /api/users/:googleId', async () => {
      const res = await request(app)
        .get('/api/users/333333333333333333333')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.googleId).to.be.equal(codysGoogleId)
      expect(res.body.email).to.be.equal(codysEmail)
      expect(res.body.firstName).to.be.equal(codysFirstName)
      expect(res.body.lastName).to.be.equal(codysLastName)
      expect(res.body.fullName).to.be.equal(codysFullName)
      expect(res.body.imgUrl).to.be.equal(codysImgUrl)
    })
  }) // End describe('/api/users')
}) // End describe('User routes')
