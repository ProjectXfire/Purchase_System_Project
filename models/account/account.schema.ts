import Joi from 'joi'

export const AccountSchema = Joi.object({
  costcode: Joi.required().messages({
    'string.empty': 'The field "Cost Code" must not be empty',
    'any.required': 'The field "Cost Code" must not be empty'
  }),
  costtype: Joi.required().messages({
    'string.empty': 'The field "Cost Type" must not be empty',
    'any.required': 'The field "Cost Type" must not be empty'
  }),
  budget: Joi.required().messages({
    'string.empty': 'The field "Budget" must not be empty',
    'any.required': 'The field "Budget" must not be empty'
  })
})
