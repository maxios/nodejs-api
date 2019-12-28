const router = require('express').Router();
const schema = require('./validation/payment.js');
const fawry = require('../services/fawry');
const uuid = require('uuidv4').default;

// GET all Records
router.post('/', (req, res) => {
  schema.validate(req.body);
  const { session_id, session_name, mobile_number, amount } = req.body;

  const fawryClient = fawry.init({
    isSandbox: process.env.ENVIRONMENT,
    fawrySecureKey: process.env.FAWRY_SECURE_KEY
  });

  fawryClient.charge({
    merchantCode: process.env.FAWRY_MERCHANT_CODE,
    merchantRefNum: session_id,
    customerProfileId: uuid(),
    customerMobile: mobile_number,
    paymentMethod: 'PAYATFAWRY',
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
      res.send(response.data)
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
      res.send({statusCode: 400, message: 'Something went wrong.'})
    })
})

module.exports = router;
