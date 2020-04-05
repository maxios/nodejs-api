var Joi = require('@hapi/joi');

module.exports = Joi.object({
  session_id: Joi.string().required(),
  session_name: Joi.string().required(),
  mobile_number:	Joi.string().required(),
  amount: Joi.string().required()
})
