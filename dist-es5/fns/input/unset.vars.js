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
var __moduleName = "dist-es5/fns/input/unset.vars";
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
//# sourceURL=src/fns/input/unset.vars.js