const db = require('../../db')

module.exports = function bearerToken (req, res, next) {
  const { identifier } = req.params
  const authorization = req.headers.authorization
  const sessionToken = authorization.split(' ')[1]

  const activeSessionToken = db
    .get('sessionTokens')
    .find({ token: sessionToken })
    .value()

  const account = db
    .get('accounts')
    .find({ identifier })
    .value()

  if (!sessionToken || !activeSessionToken) {
    res.status(401).json({ message: "Unauthorized" })
  } else if (identifier && activeSessionToken.identifier !== identifier) {
    res.status(403).json({ message: "Cannot see this account" })
  } else if (identifier && !account) {
    res.status(404).json({ message: "Account not found" })
  } else {
    next()
  }
}
