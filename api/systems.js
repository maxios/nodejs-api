const router = require('express').Router();
const System = require('@models').System;
const SystemEntity = require('@entities').SystemEntity;

const serializeResult = result => SystemEntity.represent(result);

// GET all Records
router.get('/', (req, res) => {
  System.findAll({raw: true, where: {visible: true}})
    .then(result => {
      res.json(serializeResult(result));
    })
    .catch(err => res.send(err))
});

// GET one record - where: uid
router.get('/:uid', (req, res) => {
  System.findOne({where: {uid: req.params.uid, visible: true}})
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err));
})

// POST create record
router.post('/', (req, res) => {
  System.create(req.body)
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err))
})

// DELETE one record
router.delete('/:uid', (req, res) => {
  System.destroy({where: {uid: req.query.uid}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

// DELETE all records
router.delete('/flush', (req, res) => {
  System.destroy({where: {}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

module.exports = router;
