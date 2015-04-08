define("config-routes/fns/input/collection.filterWhere", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/collection.filterWhere";
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
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/collection.filterWhere.js