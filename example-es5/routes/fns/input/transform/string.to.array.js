"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/transform/string.to.array";
function stringToArray(state, config) {
  var input = state.get(config.stringAt);
  var inputParts = input.split(config.delim);
  state.set(config.saveTo, inputParts);
}
var $__default = stringToArray;
;
//# sourceURL=src/fns/input/transform/string.to.array.js