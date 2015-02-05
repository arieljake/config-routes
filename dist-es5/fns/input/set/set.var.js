"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/set/set.var";
var VariableString = require("../../../utils/VariableString").VariableString;
function setVar(state, config) {
  var value;
  if (config.value) {
    value = config.value;
  } else if (config.valueVarName) {
    value = state.get(config.valueVarName);
  } else if (config.valueString) {
    value = state.translate(config.valueString);
  }
  switch (config.format) {
    case "integer":
      value = parseInt(value, 10);
      break;
    case "string":
      value = value.toString();
      break;
  }
  state.set(config.saveTo, value);
}
var $__default = setVar;
;
//# sourceURL=src/fns/input/set/set.var.js