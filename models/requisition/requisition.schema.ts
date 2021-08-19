import Joi from 'joi'

export const RequisitionSchema = Joi.object({
  description: Joi.string().required().messages({
    'string.empty': 'The field "Description" must not be empty'
  }),
  createdBy: Joi.string().required().messages({
    'string.empty': 'The field "Create by" must not be empty'
  }),
  createdByStatus: Joi.string().required().messages({
    'string.empty': 'The field "Originator Status" must not be empty'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'The field "Location" must not be empty'
  }),
  priority: Joi.string().required().messages({
    'string.empty': 'The field "Priority" must not be empty'
  }),
  priorityJustification: Joi.string().required().messages({
    'string.empty': 'The field "Priority" must not be empty'
  }),
  requestor: Joi.string().required().messages({
    'string.empty': 'The field "Requestor" must not be empty'
  }),
  currency: Joi.string().required().messages({
    'string.empty': 'The field "Currency" must not be empty'
  }),
  shipBy: Joi.string().required().messages({
    'string.empty': 'The field "Ship by" must not be empty'
  }),
  shipTo: Joi.string().required().messages({
    'string.empty': 'The field "Ship to" must not be empty'
  }),
  dateRequired: Joi.date().required().messages({
    'string.empty': 'The field "Date required" must not be empty'
  }),
  observation: Joi.optional(),
  contract: Joi.optional(),
  account: Joi.when('contract', {
    is: Joi.string(),
    then: Joi.string().required()
  }),
  expense: Joi.optional(),
  costtype: Joi.when('expense', {
    is: Joi.string(),
    then: Joi.string().required()
  }),
  subledger: Joi.optional(),
  approvedBy: Joi.string().required(),
  approvedByStatus: Joi.optional(),
  approvedByDate: Joi.optional(),
  items: Joi.array().optional()
})
