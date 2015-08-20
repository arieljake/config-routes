define("config-routes/fns/input/collection.findWhere", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/collection.findWhere";
  var _ = require("lodash");
  function findWhere(state, config) {
    var collection = state.get(config.collectionVarName);
    var query = config.query || state.get(config.queryVarName);
    var value = _.findWhere(collection, query);
    if (config.saveTo)
      state.set(config.saveTo, value);
    return value;
  }
  var $__default = findWhere;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/collection.findWhere.js