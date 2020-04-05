const router = require('express').Router();
const { paymentSchema, checkoutSchema } = require('./validation/payment.js');
const fawry = require('../services/fawry');
const uuid = require('uuidv4').default;
const generateSignature = require('@utils/signature');

router.post('/checkout', (req, res) => {
  const validation = checkoutSchema.validate(req.body);
  if (validation.error) res.json(validation.error["details"]);

  const {
    sessions,
    customer,
    expiry
  } = req.body

  const merchantRefNumber = `sheikhalamoud${uuid()}`
  const { name, mobile, email } = customer;
  const itemsSignature = sessions.map(({uid, quantity, cost}) => `${uid}${quantity}${cost}`).join('');

  const signature = generateSignature(
    process.env.FAWRY_MERCHANT_CODE,
    merchantRefNumber,
    itemsSignature,
    expiry,
    process.env.FAWRY_SECURE_KEY
  );

  res.json({
    language: "ar-eg",
    merchantCode: process.env.FAWRY_MERCHANT_CODE,
    merchantRefNumber,
    customer: {
      name,
      mobile,
      email,
    },
    order: {
      description: name,
      expiry: expiry,
      orderItems: sessions.map(session => ({
        productSKU: session.uid,
        description: session.name,
        price: session.cost,
        quantity: session.quantity,
        width:"10",
        height:"5",
        length:"100",
        weight:"1"
      }))
    },
    signature
  })
});

router.post('/', (req, res) => {
  paymentSchema.validate(req.body);
  const { session_id, session_name, mobile_number, amount, card_token } = req.body;

  const paymentMethod = card_token ? 'CARD' : 'PAYATFAWRY';

  const fawryClient = fawry.init({
    isSandbox: process.env.ENVIRONMENT,
    fawrySecureKey: process.env.FAWRY_SECURE_KEY
  });

  fawryClient.charge({
    merchantCode: process.env.FAWRY_MERCHANT_CODE,
    merchantRefNum: session_id,
    customerProfileId: uuid(),
    customerMobile: mobile_number,
    paymentMethod,
    currencyCode: 'EGP',
    amount,
    description: session_name,
    chargeItems: [{
      itemId: session_id,
      description: session_name,
      price: amount,
      quantity: 1
    }]
  })
    .then(response => {
      res.json(response.data)
    })
    .catch(() => {
      res.send({statusCode: 400, message: 'Something Went Wrong.'})
    })
});

router.get('/status', (req, res) => {
  const { reference_number } = req.query

  const fawryClient = fawry.init({
    isSandbox: true,
    fawrySecureKey: process.env.FAWRY_SECURE_KEY
  });

  fawryClient.status({
    merchantCode: process.env.FAWRY_MERCHANT_CODE,
    merchantRefNumber: reference_number
  })
    .then(response => res.send(response.data))
    .catch(err => {
      console.log(err);
      res.json({statusCode: 400, message: 'Something went wrong.'})
    })
})

module.exports = router;
