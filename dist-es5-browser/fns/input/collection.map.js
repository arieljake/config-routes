define("config-routes/fns/input/collection.map", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/collection.map";
  var _ = require("lodash");
  var SetVars = require('./set.vars').default;
  function map(state, config) {
    var collection = state.get(config.collectionVarName);
    var value = _.map(collection, function(item, index) {
      state.set(config.sourceKey, item);
      if (config.indexKey) {
        state.set(config.indexKey, index);
      }
      SetVars(state, config.map);
      var result = state.get(config.destKey);
      state.unset(config.sourceKey);
      state.unset(config.destKey);
      return result;
    });
    state.set(config.saveTo, value);
    if (config.deleteOriginal === true) {
      state.unset(config.collectionVarName);
    }
    return value;
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