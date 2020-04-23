// Imports
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')
const passport = require('passport')
const session = require('express-session')
const socketio = require('socket.io')
const {blueBright, magenta, yellow} = require('chalk')

const db = require('./db')

// Initializations
const app = express()
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 1337

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 **/
if (process.env.NODE_ENV !== 'production') require('../secrets')

// Passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

const createApp = () => {
  // Logging middleware
  app.use(morgan('dev'))

  // Body Parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // Compression middleware
  app.use(compression())

  // Session middleware with Passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'My best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // Auth and API routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // Static File-Serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // Any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const error = new Error('Not found')
      error.status = 404
      next(error)
    } else {
      next()
    }
  })

  // Sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // Custom error handling
  app.use((error, req, res, next) => {
    // Just in case
    if (!error.stack || !error.message) {
      next(error)
    }

    // Clean up the trace to just relevant info
    const cleanTrace = error.stack
      .split('\n')
      .filter(line => {
        // Comment out the next two lines for full (verbose) stack traces
        const projectFile = line.indexOf(__dirname) > -1 // Omit built-in Node code
        const nodeModule = line.indexOf('node_modules') > -1 // Omit npm modules
        return projectFile && !nodeModule
      })
      .join('\n')

    // Colorize and format the output
    console.log(
      magenta(`
    >>>>> Error: ${error.message} <<<<<

${yellow(cleanTrace)}
    `)
    )

    // Send back error status
    res
      .status(error.status || 500)
      .send(error.message || 'Internal server error.')
  })
}

const startListening = () => {
  // Start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => {
    console.log(`

    Mixing it up on port ${PORT}

    ${blueBright(`http://localhost:${PORT}/`)}

`)
  })

  // Set up our Socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}

// Exports
module.exports = app
