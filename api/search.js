const Sequelize = require('sequelize');
const router = require('express').Router();
const Session = require('@models').Session;
const Instructor = require('@models').Instructor;
const Location = require('@models').Location;
const System = require('@models').System;
const SessionEntity = require('@entities').SessionEntity;
const InstructorEntity = require('@entities').InstructorEntity;

const serializeSession = result => SessionEntity.represent(result);
const serializeInstructor = result => InstructorEntity.represent(result);
const Op = Sequelize.Op;

router.get('/', (req, res) => {
  console.log('begin to findall');
  Session.findAll({
    include: [{
      model: System
    }, {
      model: Location
    }],
    where: {
      [Op.or]: [
        {name: { [Op.like]: '%' + req.query['query'] + '%' }},
        {description: { [Op.like]: '%' + req.query['query'] + '%' }}
      ]
    }
  })
    .then(result => {
      const sessions = serializeSession(result);

      console.log('instructors', sessions);
      Instructor.findAll({
        where: {
          name: { [Op.like]: '%' + req.query['query'] + '%' }
        }
      })
        .then(result => {
          const instructors = serializeInstructor(result);

          console.log('instructors', instructors);
          res.json({sessions: sessions, instructors: instructors})
        })
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
});

module.exports = router;
