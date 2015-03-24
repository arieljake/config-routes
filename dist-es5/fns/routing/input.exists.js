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
var __moduleName = "dist-es5/fns/routing/input.exists";
function inputExists(state, config) {
  var missingInputs = [];
  if (config.vars) {
    config.vars.forEach(function(varName) {
      var value = state.get(varName);
      if (value === undefined)
        missingInputs.push(varName);
    });
  }
  state.set(config.saveTo, missingInputs);
  if (config.throwOnError === true && missingInputs.length > 0) {
    return Q.reject({missingInputs: missingInputs});
  }
}
var $__default = inputExists;
;
function humanize(utils, config) {
  var output = utils.devariable("validate input", config);
  return output;
}
;
//# sourceURL=src/fns/routing/input.exists.js