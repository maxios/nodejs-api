const router = require('express').Router();
const Tag = require('@models').Tag;
const TagEntity = require('@entities').TagEntity;
const mapByProp = require('@utils').mapByProp

const serializeResult = result => TagEntity.represent(result);

// GET all Records
router.get('/', (req, res) => {
  Tag.findAll({raw: true})
    .then(result => {
      res.json(serializeResult(result));
    })
    .catch(err => res.send(err))
});

router.get('/forest', (req, res) => {
  Tag.findAll({raw: true})
    .then(result => {
      res.json({data: mapByProp('name', serializeResult(result))});
    })
    .catch(err => res.send(err))
})

// GET one record - where: uid
router.get('/:uid', (req, res) => {
  Tag.findOne({where: {uid: req.params.uid}})
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err));
})

// POST create record
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err))
})

// DELETE one record
router.delete('/:uid', (req, res) => {
  Tag.destroy({where: {uid: req.query.uid}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

// DELETE all records
router.delete('/flush', (req, res) => {
  Tag.destroy({where: {}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

module.exports = router;
