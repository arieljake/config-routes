"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist/fnLib/input/transform/string.to.array";
function stringToArray(state, config) {
  var input = state.get(config.stringAt);
  var inputParts = input.split(config.delim);
  state.set(config.outputTo, inputParts);
}
var $__default = stringToArray;
;
//# sourceURL=fnLib/input/transform/string.to.array.js