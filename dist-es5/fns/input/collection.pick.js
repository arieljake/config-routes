"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.pick";
var _ = require("lodash");
function collectionPick(state, config) {
  var collection = state.get(config.collectionVarName);
  var propertyNames = config.propertyNames;
  var value = _.map(collection, function(item) {
    return _.pick(item, propertyNames);
  });
  state.set(config.saveTo, value);
  if (config.deleteOriginal === true) {
    state.unset(config.collectionVarName);
  }
}
var $__default = collectionPick;
;
//# sourceURL=src/fns/input/collection.pick.js