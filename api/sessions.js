const Sequelize = require('sequelize');
const router = require('express').Router();
const Session = require('@models').Session;
const Location = require('@models').Location;
const System = require('@models').System;
const Instructor = require('@models').Instructor;
const Tag = require('@models').Tag;
const Ticket = require('@models').Ticket;
const Science = require('@models').Science;
const SessionEntity = require('@entities').SessionEntity;

const serializeResult = result => SessionEntity.represent(result);
const Op = Sequelize.Op;

const filterSystem = function (query) {
  if (query['system_ids']) {
    return {
      where: {uid: query['system_ids']}
    }
  }

  return {};
}

const filterLocation = function (query) {
  if (query['location_ids']) {
    return {
      where: {uid: query['location_ids']}
    }
  }

  return {};
}

const filterTag = function(query) {
  if (query['tag_ids']) {
    return {
      where: {uid: query['tag_ids']}
    }
  }

  if (query['tag_names']) {
    return {
      where: {name: query['tag_names']}
    }
  }

  return {};
}

const filterInstructor = function(query) {
  if (query['instructor_ids']) {
    return {
      where: {uid: query['instructor_ids']}
    }
  }

  return {};
}

const filterScience = function(query) {
  if (query['science_ids']) {
    return {
      where: {uid: query['science_ids']}
    }
  }

  return {};
}

const filterWhere = function(query) {
  let where = {};
  if (query['days']) {
    where['days'] = {[Op.overlap]: query['days']}
  }

  if (query['rowaq_id']) {
    where['rowaq_id'] = parseInt(query['rowaq_id'])
  }

  if (query['after_date'] && query['before_date']) {
    where[Op.or] = [
      {start_date: {[Op.between]: [query['after_date'], query['before_date']]}},
      {end_date: {[Op.gte]: query['after_date']}},
      {end_date: {[Op.gte]: query['before_date']}}
    ]

    return where;
  }

  if (query['after_date']) {
    where['start_date'] = {[Op.gte]: query['after_date']}
    where['end_date'] = {[Op.gte]: query['after_date']}
  }

  if (query['end_date']) {
    where['start_date'] = {[Op.lte]: query['after_date']}
    where['end_date'] = {[Op.lte]: query['after_date']}
  }

  return where;
}

/**
  /: get all sessions

  */
router.get('/', (req, res) => {
  Session.findAll({
    include: [{
      model: System,
      ...filterSystem(req.query)
    }, {
      model: Location,
      ...filterLocation(req.query)
    }, {
      model: Science,
      ...filterScience(req.query)
    }, {
      model: Tag,
      ...filterTag(req.query)
    }, {
      model: Ticket
    } ,{
      model: Instructor,
      ...filterInstructor(req.query)
    }],
    where: filterWhere(req.query)
  })
    .then(result => {
      res.json(serializeResult(result));
    })
    .catch(err => {
      console.log(err)
      res.json(err.message)
    })
});

// GET one record - where: uid
router.get('/:uid', (req, res) => {
  Session.findOne({
    where: {uid: req.params.uid},
    include: [{
      model: Location
    }, {
      model: System,
    }, {
      model: Tag,
    }, {
      model: Ticket,
    }, {
      model: Instructor
    }]})
    .then(result => {
      return res.json(serializeResult(result))
    })
    .catch(err => res.json(err.message));
})

// POST create record
router.post('/', (req, res) => {
  Session.create(req.body)
    .then(result => res.json(serializeResult(result)))
    .catch(err => res.send(err))
})

// DELETE one record
router.delete('/:uid', (req, res) => {
  Session.destroy({where: {uid: req.query.uid}})
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
