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
var __moduleName = "dist-es5/fns/input/set.vars";
var SetVar = require('./set.var');
function setVars(state, config) {
  config.vars = config.vars || [];
  config.vars.forEach(function(varConfig) {
    SetVar.default(state, varConfig);
  });
}
var $__default = setVars;
;
function humanize(utils, config) {
  var output = "";
  config.vars.forEach(function(varConfig) {
    if (output.length > 0)
      output += "\n";
    output += SetVar.humanize(utils, varConfig);
  });
  return output;
}
//# sourceURL=src/fns/input/set.vars.js