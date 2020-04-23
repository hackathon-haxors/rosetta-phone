'use strict'

// Imports
const {red, green} = require('chalk')

const db = require('../server/db')

// Models
const {User} = require('../server/db/models')

// Initializations
async function seed() {
  await db.sync({force: true})
  console.log('Database is synced!')

  const users = await Promise.all([
    User.create({
      googleId: '111111111111111111111',
      email: 'cody@puppybook.com',
      firstName: 'Cody',
      lastName: 'DaPug',
      fullName: 'Cody DaPug',
      imgUrl:
        'https://vetstreet.brightspotcdn.com/dims4/default/354d0cf/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fdc%2Fc4%2F8ccd3a28438d81b2f2f5d8031a05%2Fpug-ap-r82p3q-645.jpg'
    }),
    User.create({
      googleId: '222222222222222222222',
      email: 'murphy@puppybook.com',
      firstName: 'Murphy',
      lastName: 'DaPug',
      fullName: 'Cody DaPug',
      imgUrl:
        'https://vetstreet.brightspotcdn.com/dims4/default/354d0cf/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fdc%2Fc4%2F8ccd3a28438d81b2f2f5d8031a05%2Fpug-ap-r82p3q-645.jpg'
    })
  ])

  console.log(`Seeded ${users.length} Users`)
  console.log(green('Seeded database successfully'))
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('Seeding...')
  try {
    await seed()
  } catch (error) {
    console.error(red('Oh no! Something went wrong!'))
    console.error(error)
    process.exitCode = 1
  } finally {
    console.log('Closing database connection...')
    await db.close()
    console.log('Database connection is closed!')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// Exports
// We export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
