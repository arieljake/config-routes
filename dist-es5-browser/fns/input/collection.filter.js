define("config-routes/fns/input/collection.filter", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/collection.filter";
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
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/collection.filter.js