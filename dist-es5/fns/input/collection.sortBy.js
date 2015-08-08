"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.sortBy";
var _ = require("lodash");
function sortBy(state, config) {
  var collection = state.get(config.collectionVarName);
  var value = _.sortBy(collection, config.propertyName);
  if (config.reverse)
    value.reverse();
  if (config.saveTo)
    state.set(config.saveTo, value);
  return value;
}
var $__default = sortBy;
;
//# sourceURL=src/fns/input/collection.sortBy.js