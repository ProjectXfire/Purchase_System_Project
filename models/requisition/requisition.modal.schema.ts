import Joi from 'joi'

export const RequisitionModalSchema = Joi.object({
  location: Joi.string().required().messages({
    'any.required': 'The field "location" must not be empty',
    'string.empty': 'The field "location" must not be empty'
  }),
  year: Joi.number().min(2000).required().messages({
    'any.required': 'The field "year" must not be empty',
    'number.min': 'The field "year" must not be empty'
  })
})
