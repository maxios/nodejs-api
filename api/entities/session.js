const Base = require('@entities/base');
const System = require('@entities/system');
const Location = require('@entities/location');

module.exports = Base.extend({
  name: true,
  description: true,
  start_time: true,
  end_time: true,
  start_date: true,
  end_date: true,
  days: true,
  System: { using: System },
  Location: { using: Location },
  no_lectures: true,
  soundcloud_url: true,
  youtube_url: true,
  google_url: true,
  book: true,
  cost: true,
  payment_url: true,
  duration_in_minutes: true
})
