const router = require('express').Router();
const Instructor = require('@models').Instructor;
const InstructorEntity = require('@entities').InstructorEntity;
const mapByProp = require('@utils').mapByProp

const serializeResult = result => InstructorEntity.represent(result);

// GET all Records
router.get('/', (req, res) => {
  Instructor.findAll({raw: true, where: {visible: true}})
    .then(result => {
      res.json(serializeResult(result));
    })
    .catch(err => res.send(err))
});

router.get('/forest', (req, res) => {
  Instructor.findAll({raw: true})
    .then(result => {
      res.json({data: mapByProp('name', serializeResult(result))});
    })
    .catch(err => res.send(err))
})

// GET one record - where: uid
router.get('/:uid', (req, res) => {
  console.log(req.params);
  Instructor.findOne({where: {uid: req.params.uid, visible: true}})
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err));
})

// POST create record
router.post('/', (req, res) => {
  Instructor.create(req.body)
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err))
})

// DELETE one record
router.delete('/:uid', (req, res) => {
  Instructor.destroy({where: {uid: req.query.uid}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

// DELETE all records
router.delete('/flush', (req, res) => {
  Instructor.destroy({where: {}})
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err))
})

module.exports = router;
