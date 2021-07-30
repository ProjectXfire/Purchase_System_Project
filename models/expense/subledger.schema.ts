import Joi from 'joi'

export const SubledgerSchema = Joi.object({
  name: Joi.string().length(8).required().messages({
    'string.empty': 'The field "Name" must not be empty',
    'string.length': 'The field must contain "8" characters'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'The field "Description" must not be empty'
  })
})
