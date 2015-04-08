define("config-routes/fns/input/collection.pick", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/collection.pick";
  var _ = require("lodash");
  function collectionPick(state, config) {
    var collection = state.get(config.collectionVarName);
    var propertyNames = config.propertyNames;
    var value = _.map(collection, function(item) {
      return _.pick(item, propertyNames);
    });
    state.set(config.saveTo, value);
    if (config.deleteOriginal === true) {
      state.unset(config.collectionVarName);
    }
  }
  var $__default = collectionPick;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/collection.pick.js