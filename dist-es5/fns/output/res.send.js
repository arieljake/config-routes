"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/output/res.send";
function resSend(state, config) {
  var res = state.get("res");
  var value;
  if (config.value) {
    value = config.value;
  } else if (config.valueVarName) {
    value = state.get(config.valueVarName);
  }
  res.send(value);
}
var $__default = resSend;
;
//# sourceURL=src/fns/output/res.send.js