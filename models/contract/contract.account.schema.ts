import Joi from 'joi'

export const ContractAccountSchema = Joi.object({
  contract: Joi.string().required().messages({
    'string.empty': 'The field "Contract" must not be empty',
    'any.required': 'The field "Contract" must not be empty'
  }),
  account: Joi.string().required().messages({
    'string.empty': 'The field "Account" must not be empty',
    'any.required': 'The field "Account" must not be empty'
  })
})
