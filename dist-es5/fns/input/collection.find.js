"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.find";
var _ = require("lodash");
var Filter = require("../../lib/Filter").Filter;
function collectionFind(state, config) {
  var collection = state.get(config.collectionVarName);
  var result = _.find(collection, function(item) {
    return Filter.filter(item, config.filter, state);
  });
  state.set(config.saveTo, result);
}
var $__default = collectionFind;
;
//# sourceURL=src/fns/input/collection.find.js