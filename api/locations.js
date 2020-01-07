const router = require('express').Router();
const Location = require('@models').Location;
const LocationEntity = require('@entities').LocationEntity;
const mapByProp = require('@utils').mapByProp

const serializeResult = result => LocationEntity.represent(result);

// GET all Records
router.get('/', (req, res) => {
  Location.findAll({raw: true, where: {visible: true}})
    .then(result => {
      res.json(serializeResult(result));
    })
    .catch(err => res.send(err))
});

router.get('/forest', (req, res) => {
  Location.findAll({raw: true})
    .then(result => {
      res.json({data: mapByProp('name', serializeResult(result))});
    })
    .catch(err => res.send(err))
})

// GET one record - where: uid
router.get('/:uid', (req, res) => {
  Location.findOne({where: {uid: req.query.uid, visible: true}})
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err));
})

// POST create record
router.post('/', (req, res) => {
  Location.create(req.body)
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err))
})

// DELETE one record
router.delete('/:uid', (req, res) => {
  Location.destroy({where: {uid: req.query.uid}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

// DELETE all records
router.delete('/flush', (req, res) => {
  Location.destroy({where: {}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

module.exports = router;
