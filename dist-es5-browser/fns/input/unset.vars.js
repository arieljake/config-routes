define("config-routes/fns/input/unset.vars", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/unset.vars";
  var _ = require('lodash');
  var ObjectPath = require("../../utils/ObjectPath").ObjectPath;
  function unsetVars(state, config) {
    var value = state.get(config.valueVarName);
    var varsToUnset = config.vars;
    varsToUnset.forEach(function(varName) {
      var path = new ObjectPath(varName);
      path.deleteIn(value);
    });
  }
  var $__default = unsetVars;
  ;
  function humanize(utils, config) {
    var varsString = config.vars.join(", ");
    var output = "unset " + varsString + " in " + config.valueVarName;
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
//# sourceURL=src/fns/input/unset.vars.js