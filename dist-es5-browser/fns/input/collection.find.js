define("config-routes/fns/input/collection.find", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/collection.find";
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
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/collection.find.js