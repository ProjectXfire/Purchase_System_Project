import Joi from 'joi'

export const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'The field "Email" must not be empty',
      'string.email': 'The value must be an appropriate email'
    }),
  password: Joi.required().messages({
    'string.empty': 'The field "Password" must not be empty'
  })
})
