const Base = require('@entities/base');

module.exports = Base.extend({
  name: true,
  description: true,
  status: true,
  visible: true,
  order: true
})
