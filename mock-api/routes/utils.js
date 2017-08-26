const formatValidationErrors = (err) => {

  const errors = {}

  err.inner.forEach((error) => {
    error.path === 'email'
      ? errors[error.path] = 'not_valid'
      : errors[error.path] = errorMappings[error.type] || error.type
  })

  return errors
}

const randomToken = () => {
  const dictionary = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('')
  let token = ''

  for (i  =0; i < 32; i++) {
    token += dictionary[Math.floor(Math.random() * dictionary.length)];
  }

  return token
}

module.exports = {
  formatValidationErrors,
  randomToken
}

const errorMappings = {
  required: 'not_present',
  invalid: 'not_valid'
}
