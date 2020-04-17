const router = require('express').Router();
const R = require('ramda');
const { paymentSchema, checkoutSchema } = require('./validation/payment.js');
const fawry = require('../services/fawry');
const { fawry_secure_key, fawry_merchant_code, fawry_expiry } = require('@config/env');
const uuid = require('uuidv4').default;
const { generateSignature } = require('@utils/signature');
const Session = require('@models').Session;
const Ticket = require('@models').Ticket;
const SessionEntity = require('@entities').SessionEntity;

const serializeSession = result => SessionEntity.represent(result);

/**
 * NOTE: the uid of merchantRefNumber and ProductSKU is modified to have no (-) hiphen so that its length almost 32 as required in fawry
 */
router.post('/checkout', async (req, res) => {
  const validation = checkoutSchema.validate(req.body);
  if (validation.error) res.json(validation.error["details"]);

  const findInRequest = session_uid => R.find(
    R.propEq('session_id', session_uid)
  )(req.body.tickets)

  // get sessions name and cost and populate them with correspondants quantities
  const items = await Session.findAll({
    attributes: ['uid', 'name'],
    include: { model: Ticket },
    where: { uid: R.pluck('session_id', req.body.tickets) }
  })

    .then(sessions => {
      const Sessions = serializeSession(sessions)
      console.log(Sessions);
      const getSession = session_id => R.find(R.propEq('uid', session_id))(Sessions);
      const getTicketId = session_id => {
        const ticket_id = findInRequest(session_id).ticket_id
        const session = getSession(session_id);
        const isTicketExist = R.find(R.propEq('uid', ticket_id))(session.Tickets)

        if (R.not(isTicketExist)) return res.json({
          statusCode: 500,
          message: `the ${session.name} has no requested ticket id: ${ticket_id}`
        })

        return ticket_id
      }
      const sortByUid = R.sortBy(R.prop('uid'));

      return R.compose(
        R.map(ticket => ({
          ...getSession(ticket.session_id),
          cost: R.find(
            R.propEq( 'uid', ticket.ticket_id)
          )(getSession(ticket.session_id).Tickets).cost,
          quantity: ticket.quantity
        })),
        sortByUid
      )(req.body.tickets)
    })

    .catch(error => {
      console.log('[ERROR]', error)
      res.json({statusCode: 400, message: error.message})
    });

  // the uid of merchantRefNumber is uuid v4 without (-) hiphen. replaced the 7 chars with Alamoud string.
  const merchantRefNumber = uuid().split('-').join('').replace(/^.{7}/g, "ALAMOUD");
  const signature = generateSignature(
    fawry_merchant_code,
    merchantRefNumber,
    R.map(
      ({uid, quantity, cost}) => {
        return `${uid}${quantity}${cost}`
      })(items)
    .join(''),
    fawry_expiry,
    fawry_secure_key
  );

  const params = {
    language: "ar-eg",
    merchantCode: process.env.FAWRY_MERCHANT_CODE,
    merchantRefNumber,
    order: {
      expiry: fawry_expiry,
      orderItems: R.map(item => ({
        productSKU: item.uid.split('-').join(''),
        description: item.name,
        price: item.cost,
        quantity: item.quantity,
        width:"10",
        height:"5",
        length:"100",
        weight:"1"
      }))(items)
    },
    signature
  }

  if (req.body.customer) {
    params['customer'] = req.body.customer
  }

  res.json(params)
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
      console.log('[ERROR]', err);
      res.json({statusCode: 400, message: 'Something went wrong.'})
    })
})

module.exports = router;
