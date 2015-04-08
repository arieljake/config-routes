define("config-routes/fns/input/copy", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/copy";
  function copy(state, config) {
    var value = state.get(config.valueAt);
    state.set(config.saveTo, value);
  }
  var $__default = copy;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/copy.js