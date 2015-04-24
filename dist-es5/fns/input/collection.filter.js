"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.filter";
var _ = require("lodash");
var Filter = require("../../lib/Filter").Filter;
function collectionFilter(state, config) {
  var collection = state.get(config.collectionVarName);
  var result = _.filter(collection, function(item) {
    return Filter.filter(item, config.filter, state);
  });
  state.set(config.saveTo, result);
}
var $__default = collectionFilter;
;
//# sourceURL=src/fns/input/collection.filter.js