"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/set/set.var";
function setVar(state, config) {
  var value;
  if (config.value) {
    value = config.value;
  } else if (config.valueVarName) {
    value = state.get(config.valueVarName);
  }
  state.set(config.saveTo, value);
}
var $__default = setVar;
;
//# sourceURL=src/fns/input/set/set.var.js