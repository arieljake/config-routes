define("config-routes/fns/input/collection.groupBy", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/collection.groupBy";
  var _ = require("lodash");
  function groupBy(state, config) {
    var collection = state.get(config.collectionVarName);
    var value = _.groupBy(collection, config.propertyName);
    state.set(config.saveTo, value);
    if (config.deleteOriginal === true) {
      state.unset(config.collectionVarName);
    }
  }
  var $__default = groupBy;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/collection.groupBy.js