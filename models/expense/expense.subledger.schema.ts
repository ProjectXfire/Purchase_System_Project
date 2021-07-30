import Joi from 'joi'

export const ExpenseSubledgerSchema = Joi.object({
  expense: Joi.string().required().messages({
    'string.empty': 'The field "Expense" must not be empty',
    'any.required': 'The field "Expense" must not be empty'
  }),
  subledger: Joi.string().required().messages({
    'string.empty': 'The field "Subledger" must not be empty',
    'any.required': 'The field "Subledger" must not be empty'
  })
})
