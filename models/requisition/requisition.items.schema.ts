import Joi from 'joi'

export const RequisitionItemsSchema = Joi.object({
  itemCategory: Joi.string().required().messages({
    'string.empty': 'The field "Item category" must not be empty'
  }),
  material: Joi.string().when('itemCategory', {
    switch: [{ is: 'Purchase', then: Joi.required() }],
    otherwise: Joi.allow(null)
  }),
  other: Joi.string().when('itemCategory', {
    switch: [
      { is: 'Services', then: Joi.required() },
      { is: 'Petty Cash', then: Joi.required() }
    ],
    otherwise: Joi.allow('')
  }),
  description: Joi.string().when('itemCategory', {
    switch: [{ is: 'Purchase', then: Joi.allow('') }],
    otherwise: Joi.required()
  }),
  unitMeasure: Joi.string().allow(''),
  price: Joi.number().min(0),
  quantity: Joi.number().min(0),
  totalCost: Joi.number().min(0)
})
