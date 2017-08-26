const yup = require('yup')
const db = require('../db')

module.exports = {
  create: yup.object().shape({
    password: yup.string().required(),

    password_confirmation: yup.mixed().when('password',
      (password, schema) => (
        password && password.length
        ? schema.oneOf([password]).required()
        : schema
      )
    ),

    email: yup.string().email().required(),

    identifier: yup.string()
      .required()
      .test('not_unique', 'asdsadas', (identifier) => {

        const account = db
          .get('accounts')
          .find({ identifier })
          .value()

        return !account
      }
    ),

    first_name: yup.string().required(),
    last_name: yup.string().required(),
    newsletter: yup.bool().default(false),
    changelog: yup.bool().default(false),
    company: yup.string().default(() => null),
    phone: yup.string().default(() => null),
    github_access_token: yup.mixed(),
    confirmed: yup.bool().default(false)
  }).noUnknown().strict(true),

  update: yup.object().shape({
    email: yup.string().email(),
    first_name: yup.string(),
    last_name: yup.string(),
    newsletter: yup.bool(),
    changelog: yup.bool(),
    company: yup.string(),
    phone: yup.string(),
    confirmed: yup.bool().default(false)
  }).noUnknown().strict(true),

  updatePassword: yup.object().shape({
    password: yup.string().required(),
    password_confirmation: yup.mixed().when('password',
      (password, schema) => (
        password && password.length
        ? schema.oneOf([password]).required()
        : schema
      )
    ),
  }).noUnknown().strict(true)

}
