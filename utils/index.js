const R = require('ramda');

module.exports = {
  mapByProp: (prop, array) => R.map(R.prop(prop))(array)
}
