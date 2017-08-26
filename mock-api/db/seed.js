const md5 = require('md5')

module.exports = {
  accounts: [{
    password: md5("qwerty"),
    email: 'john@doe.com',
    identifier: 'johndoe',
    first_name: 'John',
    last_name: 'Doe',
    newsletter: false,
    changelog: false,
    company: 'ACME Inc.',
    phone: '555-666-9999'
  }]
}
