define("config-routes/fns/input/string.to.array", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/string.to.array";
  function stringToArray(state, config) {
    var input = state.get(config.stringAt);
    var inputParts = input.split(config.delim);
    state.set(config.saveTo, inputParts);
  }
  var $__default = stringToArray;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/string.to.array.js