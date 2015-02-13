"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  humanize: {get: function() {
      return humanize;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/set.var.switch";
function setVarSwitchfunction(state, config) {
  var values;
  var lookup;
  var value;
  if (config.lookupVarName) {
    lookup = state.get(config.lookupVarName);
  } else if (config.lookupString) {
    lookup = state.translate(config.lookupString);
  }
  if (config.values) {
    values = config.values;
  } else if (config.valuesVarName) {
    values = state.get(config.valuesVarName);
  }
  if (lookup !== undefined)
    lookup = lookup.toString();
  if (values.hasOwnProperty(lookup))
    value = values[lookup];
  else
    value = config.defaultValue;
  state.set(config.saveTo, value);
}
var $__default = setVarSwitchfunction;
;
function humanize(utils, config) {
  var output;
  if (config.valueVarName) {
    output = utils.devariable("set #saveTo# based on lookup of #valueVarName#", config);
  } else if (config.valueString) {
    output = utils.devariable("set #saveTo# based on lookup of #valueString#", config);
  }
  return output;
}
;
//# sourceURL=src/fns/input/set.var.switch.js