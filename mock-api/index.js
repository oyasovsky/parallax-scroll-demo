const express  = require('express')
const prettify = require('express-prettify')
const slowConn = require('connect-slow')
const parser   = require('body-parser')

const { iam } = require('./routes')

const mock = express()
const port = process.env.MOCK_API_PORT || '9394'

// middlewares
mock.use(parser.json())
mock.use(slowConn())
mock.use(prettify({ query: 'pretty' }))

// routes
mock.use(iam)

mock.listen(port, () => console.log(`Listening at http://localhost:${port}`))
