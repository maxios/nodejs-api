const router = require('express').Router();
const Ticket = require('@models').Ticket;
const TicketEntity = require('@entities').TicketEntity;
const mapByProp = require('@utils').mapByProp

const serializeResult = result => TicketEntity.represent(result);

// GET all Records
router.get('/', (req, res) => {
  Ticket.findAll({raw: true})
    .then(result => {
      res.json(serializeResult(result));
    })
    .catch(err => res.send(err))
});

router.get('/forest', (req, res) => {
  Ticket.findAll({raw: true})
    .then(result => {
      res.json({data: mapByProp('name', serializeResult(result))});
    })
    .catch(err => res.send(err))
})

// GET one record - where: uid
router.get('/:uid', (req, res) => {
  Ticket.findOne({where: {uid: req.params.uid}})
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err));
})

// POST create record
router.post('/', (req, res) => {
  Ticket.create(req.body)
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err))
})

// DELETE one record
router.delete('/:uid', (req, res) => {
  Ticket.destroy({where: {uid: req.query.uid}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

// DELETE all records
router.delete('/flush', (req, res) => {
  Ticket.destroy({where: {}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

module.exports = router;
