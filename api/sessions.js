const Sequelize = require('sequelize');
const DateFns = require('date-fns');
const router = require('express').Router();
const Session = require('@models').Session;
const Location = require('@models').Location;
const System = require('@models').System;
const SessionEntity = require('@entities').SessionEntity;

const serializeResult = result => SessionEntity.represent(result);
const Op = Sequelize.Op;

const filterSystem = function (query) {
  if (query['system_uids']) {
    return {
      where: {uid: query['system_uids']}
    }
  }

  return {};
}

const filterLocation = function (query) {
  if (query['location_uids']) {
    return {
      where: {uid: query['location_uids']}
    }
  }

  return {};
}

const filterWhere = function(query) {
  let where = {};
  if (query['days']) {
    where['days'] = {[Op.overlap]: query['days']}
  }

  return where;
}

/**
  /: get all sessions

  const lastDayNextMonth = DateFns.lastDayOfMonth(DateFns.addMonths(new Date(), 1));
  const firstDayMonth = DateFns.startOfMonth(new Date());

    where: [{
      [Op.or]: [{
        start_date: {
          [Op.between]: [firstDayMonth, lastDayNextMonth]
        }
      }, {
        end_date: {
          [Op.between]: [firstDayMonth, lastDayNextMonth]
        }
      }]
    }]
  */
router.get('/', (req, res) => {
  console.log(filterWhere(req.body));
  Session.findAll({
    include: [{
      model: System,
      ...filterSystem(req.body)
    }, {
      model: Location,
      ...filterLocation(req.body)
    }],
    where: filterWhere(req.body)
  })
    .then(result => {
      res.json(serializeResult(result));
    })
    .catch(err => res.send(err))
});

// GET one record - where: uid
router.get('/:uid', (req, res) => {
  Session.findOne({raw: true, nest: true, where: {uid: req.params.uid}, include: [{model: Location}, {model: System}]})
    .then(result => {
      console.log(result);
      return res.json(serializeResult(result))
    })
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
