"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/output/console.dir";
function consoleDir(state, config) {
  var value;
  if (config.value) {
    value = config.value;
  } else if (config.valueVarName) {
    value = state.get(config.valueVarName);
  } else if (config.valueString) {
    value = state.tranlsate(config.valueString);
  }
  console.dir(value);
}
var $__default = consoleDir;
;
//# sourceURL=src/fns/output/console.dir.js