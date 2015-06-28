"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/output/console.log";
function consoleLog(state, config) {
  var value;
  if (config.value) {
    value = config.value;
  } else if (config.valueString) {
    value = state.translate(config.valueString);
  }
  console.log(value);
}
var $__default = consoleLog;
;
//# sourceURL=src/fns/output/console.log.js