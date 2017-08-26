const lowdb = require('lowdb')
const seed = require('./seed')

const db = lowdb()

db.defaults({
  sessionTokens: [],
  accounts: []
}).value()

db.set('accounts', seed.accounts).value()

module.exports = db
