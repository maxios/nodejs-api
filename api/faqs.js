const router = require('express').Router();
const Faq = require('@models').Faq;
const FaqEntity = require('@entities').FaqEntity;

const serializeResult = result => FaqEntity.represent(result);

// GET all Records
router.get('/', (req, res) => {
  Faq.findAll({raw: true})
    .then(result => {
      res.json(serializeResult(result));
    })
    .catch(err => res.send(err))
});

// GET one record - where: uid
router.get('/:uid', (req, res) => {
  Faq.findOne({where: {uid: req.query.uid}})
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err));
})

// POST create record
router.post('/', (req, res) => {
  Faq.create(req.body)
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err))
})

// DELETE one record
router.delete('/:uid', (req, res) => {
  Faq.destroy({where: {uid: req.query.uid}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

// DELETE all records
router.delete('/flush', (req, res) => {
  Faq.destroy({where: {}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

module.exports = router;
