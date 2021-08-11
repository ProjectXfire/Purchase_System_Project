import Joi from 'joi'

export const ProductSchema = Joi.object({
  partNumber: Joi.string().required().messages({
    'string.empty': 'The field "Part Number" must not be empty'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'The field "Description" must not be empty'
  }),
  unitMeasure: Joi.string().required().messages({
    'string.empty': 'The field "Unit Measure" must not be empty'
  }),
  unitPrice: Joi.number().min(0).required().messages({
    'string.empty': 'The field "Unit Measure" must not be empty',
    'string.min': 'The value must be greater or equal than 0'
  })
})
