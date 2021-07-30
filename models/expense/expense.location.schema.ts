import Joi from 'joi'

export const ExpenseLocationSchema = Joi.object({
  expense: Joi.string().required().messages({
    'string.empty': 'The field "Expense" must not be empty',
    'any.required': 'The field "Expense" must not be empty'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'The field "Location" must not be empty',
    'any.required': 'The field "Location" must not be empty'
  })
})
