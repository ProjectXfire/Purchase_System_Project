import Joi from 'joi'

export const ExpenseAccountSchema = Joi.object({
  expense: Joi.string().required().messages({
    'string.empty': 'The field "Expense" must not be empty',
    'any.required': 'The field "Expense" must not be empty'
  }),
  costtype: Joi.string().required().messages({
    'string.empty': 'The field "Account" must not be empty',
    'any.required': 'The field "Account" must not be empty'
  })
})
