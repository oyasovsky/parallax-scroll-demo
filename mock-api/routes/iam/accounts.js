const router = require('express').Router()
const clone = require('lodash.clone')
const omit = require('lodash.omit')
const md5 = require('md5')

const db = require('../../db')
const bearerToken = require('../middleware/bearerToken')
const schemas = require('../../schemas/account')

const {
  formatValidationErrors,
  randomToken
} = require('../utils')

const OMITTED_ATTRS = [
  'password',
  'password_confirmation',
  'password_reset_token',
  'password_reset_token_expires_at'
]

router.post('/accounts', (req, res) => {
  const params = clone(req.body)

  schemas.create.validate(params, { abortEarly: false })
    .then((accountAttrs) => {

      const sessionToken = randomToken()

      accountAttrs.password = md5(accountAttrs.password)
      accountAttrs = omit(schemas.create.cast(accountAttrs), ['password_confirmation'])

      db.get('accounts').push(accountAttrs).write()

      const sessionTokenAttrs = {
        identifier: accountAttrs.identifier,
        token: sessionToken
      }

      db.get('sessionTokens').push(sessionTokenAttrs).write()

      const attrs = Object.assign(
        omit(accountAttrs, ['password']),
        { session_token: sessionToken }
      )

      res.status(200).json(attrs)
    })
    .catch((errors) => {
      res.status(422).json(formatValidationErrors(errors))
    })
})

router.get('/accounts/:identifier', bearerToken, (req, res) => {
  const { identifier } = req.params

  const account = db
    .get('accounts')
    .find({ identifier })
    .value()

  const attrs = omit(account, OMITTED_ATTRS)

  res.status(200).json(attrs)
})

router.put('/accounts/:identifier', bearerToken, (req, res) => {
  const { identifier } = req.params
  const params = clone(req.body)

  schemas.update.validate(params, { abortEarly: false })
    .then((accountAttrs) => {

      const account = db.get('accounts').find({ identifier }).value()
      const newAccountAttrs = Object.assign(account, accountAttrs)

      db.get('accounts')
        .find({ identifier })
        .assign(newAccountAttrs)
        .write()

      const attrs = omit(newAccountAttrs, OMITTED_ATTRS)

      res.status(200).json(attrs)
    })
    .catch((errors) => {
      res.status(422).json(formatValidationErrors(errors))
    })
})

router.put('/accounts/:identifier/password', (req, res) => {
  const { identifier } = req.params
  const params = clone(req.body)

  schemas.updatePassword.validate(params, { abortEarly: false })
    .then((accountAttrs) => {

      const password = md5(accountAttrs.password)
      const account = db.get('accounts').find({ identifier }).value()

      db.get('accounts')
        .find({ identifier })
        .assign({ password })
        .write()

      const attrs = omit(account, OMITTED_ATTRS)

      res.status(200).json(attrs)
    })
    .catch((errors) => {
      res.status(422).json(formatValidationErrors(errors))
    })
})

router.post('/accounts/password-reset-token', (req, res) => {
  const params = clone(req.body)
  const identifier = params.identifier

  const account = db
    .get('accounts')
    .find({ identifier })
    .value()

  if (account) {
    const today = new Date()
    const tomorrow = today.setDate(today.getDate() + 1);
    const password_reset_token = randomToken()
    const password_reset_token_expires_at = tomorrow

    db.get('accounts')
      .find({ identifier })
      .assign({
        password_reset_token,
        password_reset_token_expires_at
      })
      .value()
  }

  res.status(204).send()
})

router.post('/accounts/reset-password', (req, res) => {
  const {
    password_reset_token,
    password,
    password_confirmation
  } = clone(req.body)

  const account = db
    .get('accounts')
    .find({ password_reset_token })
    .value()

  if (!account) {
    res.status(404).json({ message: 'Account not found' })
  } else if (account.password_reset_token_expires_at < new Date()) {
    res.status(403).json({ message: 'Token expired' })
  } else {
    schemas.updatePassword
      .validate({ password, password_confirmation }, { abortEarly: false })
      .then((accountAttrs) => {

        db.get('accounts')
          .find({ identifier: account.identifier })
          .assign({
            password: md5(password),
            password_reset_token: null,
            password_reset_token_expires_at: null
          })
          .write()

        const attrs = omit(account, OMITTED_ATTRS)

        res.status(200).json(attrs)
      })
      .catch((errors) => {
        res.status(422).json(formatValidationErrors(errors))
      })
  }
})

router.post('/accounts/confirm/:token', (req, res) => {
  const { token } = req.params

  const account = db.get('accounts')
    .find({ confirmation_token: token })
    .value()

  if (!account) {
    return res.status(404).json({
      message: 'Account not found'
    })
  }

  db.get('accounts')
    .find({ identifier: account.identifier })
    .assign({
      unconfirmed_email: null,
      confirmation_token: null,
      confirmed_at: null
    })
    .write()

  res.status(204).send()
})

router.post('/accounts/:identifier/confirm/resend', (req, res) => {
  const { identifier } = req.params
  const account = db
    .get('accounts')
    .find({ identifier })
    .value()

  if (!account) {
    return res.status(404).json({
      message: 'Account not found'
    })
  }

  res.status(204).send()
})

router.post('/accounts/:identifier/confirm/cancel', bearerToken, (req, res) => {
  const { identifier } = req.params

  db.get('accounts')
    .find({ identifier })
    .assign({
      unconfirmed_email: null,
      confirmation_token: null,
      confirmed_at: null
    })
    .write()

  res.status(204).send()
})

module.exports = router
