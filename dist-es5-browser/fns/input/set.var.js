define("config-routes/fns/input/set.var", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/set.var";
  var Formatter = require("../../lib/Formatter").Formatter;
  function setVar(state, config) {
    var value;
    var saveTo;
    if (config.value !== undefined) {
      value = config.value;
    } else if (config.valueVarName) {
      value = state.get(config.valueVarName);
    } else if (config.valueString) {
      value = state.translate(config.valueString);
    }
    if (value === undefined && config.hasOwnProperty("defaultValue")) {
      value = config.defaultValue;
    }
    var format;
    if (config.format)
      format = config.format;
    else if (config.formatVarName)
      format = state.get(config.formatVarName);
    if (format)
      value = Formatter.format(value, format);
    if (config.saveTo) {
      saveTo = config.saveTo;
    } else if (config.saveToString) {
      saveTo = state.translate(config.saveToString);
    }
    if (config.valueVarName && config.deleteOriginal === true) {
      state.unset(config.valueVarName);
    }
    state.set(saveTo, value);
  }
  var $__default = setVar;
  ;
  function humanize(utils, config) {
    var output;
    if (config.value) {
      output = utils.devariable("set #saveTo# to '#value#'", config);
    } else if (config.valueVarName) {
      output = utils.devariable("copy #valueVarName# to #saveTo#", config);
    } else if (config.valueString) {
      output = utils.devariable("set #saveTo# as #valueString# from state", config);
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
//# sourceURL=src/fns/input/set.var.js