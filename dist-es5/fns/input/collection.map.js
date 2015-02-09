"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.map";
var _ = require("lodash");
var SetVars = require('./set.vars');
function map(state, config) {
  var collection = state.get(config.collectionVarName);
  var value = _.map(collection, function(item) {
    state.set(config.sourceKey, item);
    SetVars.default(state, config.map);
    var result = state.get(config.destKey);
    state.unset(config.sourceKey);
    state.unset(config.destKey);
    return result;
  });
  state.set(config.saveTo, value);
}
var $__default = map;
;
//# sourceURL=src/fns/input/collection.map.js