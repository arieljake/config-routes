define("config-routes/fns/input/set.var.switch", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/set.var.switch";
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
  return {
    get default() {
      return $__default;
    },
    get humanize() {
      return humanize;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/set.var.switch.js