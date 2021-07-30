import Joi from 'joi'

export const LocationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'The field "Name" must not be empty'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'The field "Description" must not be empty'
  }),
  code: Joi.string().required().messages({
    'string.empty': 'The field "Code" must not be empty'
  })
})
