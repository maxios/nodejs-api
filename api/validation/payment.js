var Joi = require('@hapi/joi');

module.exports.paymentSchema = Joi.object({
  session_id: Joi.string().required(),
  session_name: Joi.string().required(),
  mobile_number:	Joi.string().required(),
  card_token: Joi.string(),
  amount: Joi.string().required()
})

module.exports.checkoutSchema = Joi.object({
	sessions: Joi.array().items(Joi.object({
		uid: Joi.string().required(),
		cost: Joi.string().pattern(new RegExp(/^[0-9]*.[0-9]{2}$/)).required(),
		name: Joi.string().required(),
		quantity: Joi.number().integer().required()
	})),
	customer: Joi.object({
		name: Joi.string(),
		email: Joi.string(),
		mobile: Joi.string()
	}),
	expiry: Joi.string().required()
})
