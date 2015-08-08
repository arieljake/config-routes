define("config-routes/fns/input/collection.sortBy", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/collection.sortBy";
  var _ = require("lodash");
  function sortBy(state, config) {
    var collection = state.get(config.collectionVarName);
    var value = _.sortBy(collection, config.propertyName);
    if (config.reverse)
      value.reverse();
    if (config.saveTo)
      state.set(config.saveTo, value);
    return value;
  }
  var $__default = sortBy;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/collection.sortBy.js