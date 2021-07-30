import Joi from 'joi'

export const ContractSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'The field "Name" must not be empty',
    'any.required': 'The field "Name" must not be empty'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'The field "Description" must not be empty',
    'any.required': 'The field "Description" must not be empty'
  }),
  areaUnit: Joi.string().required().messages({
    'string.empty': 'The field "Area Unit" must not be empty',
    'any.required': 'The field "Area Unit" must not be empty'
  }),
  areaUnitDescription: Joi.string().required().messages({
    'string.empty': 'The field "Area Unit Description" must not be empty',
    'any.required': 'The field "Area Unit Description" must not be empty'
  }),
  clientCode: Joi.string().allow(''),
  location: Joi.string().required().messages({
    'string.empty': 'The field "Location" must not be empty',
    'any.required': 'The field "Location" must not be empty'
  }),
  contractType: Joi.string().required().messages({
    'string.empty': 'The field "Type" must not be empty',
    'any.required': 'The field "Type" must not be empty'
  })
})
