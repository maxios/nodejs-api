const router = require('express').Router();
const Session = require('@models').Session;
const SessionEntity = require('@entities').SessionEntity;

const serializeResult = result => SessionEntity.represent(result);

// GET all Records
router.get('/', (req, res) => {
  Session.findAll({raw: true})
    .then(result => {
      res.json(serializeResult(result));
    })
    .catch(err => res.send(err))
});

// GET one record - where: uid
router.get('/:uid', (req, res) => {
  Session.findOne({where: {uid: req.params.uid}})
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err));
})

// POST create record
router.post('/', (req, res) => {
  Session.create(req.body)
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err))
})

// DELETE one record
router.delete('/:uid', (req, res) => {
  Session.destroy({where: {uid: req.params.uid}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

// DELETE all records
router.delete('/flush', (req, res) => {
  Session.destroy({where: {}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

module.exports = router;
