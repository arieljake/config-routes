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
  var query = state.get(config.queryVarName);
  var value = _.findWhere(collection, query);
  state.set(config.saveTo, value);
}
var $__default = findWhere;
;
//# sourceURL=src/fns/input/collection.findWhere.js