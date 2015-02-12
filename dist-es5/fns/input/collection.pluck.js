"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.pluck";
var _ = require("lodash");
function pluck(state, config) {
  var collection = state.get(config.collectionVarName);
  var value = _.map(collection, function(item) {
    return item[config.propertyName];
  });
  state.set(config.saveTo, value);
  if (config.deleteOriginal === true) {
    state.unset(config.collectionVarName);
  }
}
var $__default = pluck;
;
//# sourceURL=src/fns/input/collection.pluck.js