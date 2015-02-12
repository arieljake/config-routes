"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.filterWhere";
var _ = require("lodash");
function filterWhere(state, config) {
  var collection = state.get(config.collectionVarName);
  var query = config.query || state.get(config.queryVarName);
  var value = _.filter(collection, function(item) {
    var found = _.findWhere([item], query);
    var result = (found !== undefined);
    if (config.invertCondition === true)
      result = !result;
    return result;
  });
  state.set(config.saveTo, value);
}
var $__default = filterWhere;
;
//# sourceURL=src/fns/input/collection.filterWhere.js