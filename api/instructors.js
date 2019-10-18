const router = require('express').Router();
const Instructor = require('@models').Instructor;
const InstructorEntity = require('@entities').InstructorEntity;

const serializeResult = result => InstructorEntity.represent(result);

// GET all Records
router.get('/', (req, res) => {
  Instructor.findAll({raw: true})
    .then(result => {
      res.json(serializeResult(result));
    })
    .catch(err => res.send(err))
});

// GET one record - where: uid
router.get('/:uid', (req, res) => {
  Instructor.findOne({where: {uid: req.params.uid}})
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
  Instructor.destroy({where: {uid: req.params.uid}})
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
