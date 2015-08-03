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
var __moduleName = "dist-es5/fns/routing/conditional.fn";
var Q = require("q");
function conditionalFn(state, config) {
  var routeLib = state.get("$routes");
  var value = state.get(config.valueVarName);
  if (config.invertValue === true)
    value = !value;
  if (value === true) {
    var fn = routeLib.getFn(config.fn);
    return fn(state, config.config);
  }
}
var $__default = conditionalFn;
;
function humanize(utils, config) {
  var output = utils.devariable("conditional fn", config);
  return output;
}
;
//# sourceURL=src/fns/routing/conditional.fn.js