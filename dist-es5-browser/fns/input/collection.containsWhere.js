define("config-routes/fns/input/collection.containsWhere", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/collection.containsWhere";
  var _ = require("lodash");
  function containsWhere(state, config) {
    var collection = state.get(config.collectionVarName);
    var query = config.query || state.get(config.queryVarName);
    var value = _.findWhere(collection, query);
    state.set(config.saveTo, value !== undefined);
  }
  var $__default = containsWhere;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/collection.containsWhere.js