"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.containsWhere";
var _ = require("lodash");
function containsWhere(state, config) {
  var collection = state.get(config.collectionVarName);
  var query = config.query || state.get(config.queryVarName);
  var value = _.findWhere(collection, query);
  state.set(config.saveTo, value !== undefined);
}
var $__default = containsWhere;
;
//# sourceURL=src/fns/input/collection.containsWhere.js