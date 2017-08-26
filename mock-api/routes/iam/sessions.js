const router = require('express').Router()
const md5 = require('md5')

const db = require('../../db')
const { randomToken } = require('../utils')

router.delete('/sessions', (req, res) => {
  const authorization = req.headers.authorization
  const sessionToken = authorization.split(' ')[1]
  const activeSessionToken = db
    .get('sessionTokens')
    .find({ token: sessionToken })
    .value()

  if (!sessionToken) {
    res.status(401).json({ message: 'Unauthorized' })
  } else if (!activeSessionToken) {
    res.status(404).json({ message: 'Not Found' })
  } else {
    db.get('sessionTokens')
      .remove({ token: sessionToken })
      .write()

    res.status(204).send()
  }
})

router.post('/sessions', (req, res) => {
  const params = req.body
  const identifier = params.identifier
  const password = md5(params.password)

  const account = db
    .get('accounts')
    .find({ identifier, password })
    .value()

  if (!account) {
    return res.status(401).json({
      message: 'Invalid identifier or password'
    })
  }

  const sessionToken = randomToken()
  const sessionTokenAttrs = {
    identifier,
    token: sessionToken
  }

  db.get('sessionTokens').push(sessionTokenAttrs).write()

  const attrs = {
    account: {
      identifier: account.identifier,
      confirmed: account.confirmed
    },
    session_token: sessionToken
  }

  res.status(200).json(attrs)
})

module.exports = router
