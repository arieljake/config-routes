define("config-routes/fns/input/collection.map", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/collection.map";
  var _ = require("lodash");
  var SetVars = require('./set.vars');
  function map(state, config) {
    var collection = state.get(config.collectionVarName);
    var value = _.map(collection, function(item) {
      state.set(config.sourceKey, item);
      SetVars.default(state, config.map);
      var result = state.get(config.destKey);
      state.unset(config.sourceKey);
      state.unset(config.destKey);
      return result;
    });
    state.set(config.saveTo, value);
    if (config.deleteOriginal === true) {
      state.unset(config.collectionVarName);
    }
  }
  var $__default = map;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/collection.map.js