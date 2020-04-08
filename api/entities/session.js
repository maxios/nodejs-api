const Base = require('@entities/base');
const Minimal = require('@entities/minimal');
// const Instructor = require('@entities/instructor');
const Tag = require('@entities/tag');
// const Science = require('@entities/science');

module.exports = Base.extend({
  uid: true,
  name: true,
  description: true,
  start_time: true,
  end_time: true,
  start_date: true,
  end_date: true,
  days: true,
  System: { using: Minimal },
  Location: { using: Minimal },
  Sciences: { using: Minimal },
  Instructors: {using: Minimal},
  Tags: {using: Tag},
  no_lectures: true,
  soundcloud_url: true,
  youtube_url: true,
  google_url: true,
  book: true,
  cost: true,
  payment_url: true,
  rowaq_id: true,
  duration_in_minutes: true
})
