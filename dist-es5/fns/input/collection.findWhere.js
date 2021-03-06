"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.findWhere";
var _ = require("lodash");
function findWhere(state, config) {
  var collection = state.get(config.collectionVarName);
  var query = config.query || state.get(config.queryVarName);
  var value = _.findWhere(collection, query);
  if (config.saveTo)
    state.set(config.saveTo, value);
  return value;
}
var $__default = findWhere;
;
//# sourceURL=src/fns/input/collection.findWhere.js