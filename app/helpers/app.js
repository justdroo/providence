// ====================
// Module Dependencies
// ====================

let _ = require('lodash');

// ====================
// Helpers
// ====================

//
// Strip an object so that it only has properties defined in 'keys' array
//
exports.strip = (obj, keys) => {
  let validKey = (value, key) => {
    return _.includes(keys, key);
  };

  return _.pickBy(obj, validKey);
};

//
// Strip an array of incident objects so that it only has properties in 'keys'
//
exports.stripAll = (objs, keys) => {
  return _.map(objs, (obj) => {
    return exports.strip(obj, keys);
  });
};
