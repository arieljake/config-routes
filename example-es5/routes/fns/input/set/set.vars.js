"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/set/set.vars";
var setVar = require('./set.var').default;
function setVars(state, config) {
  config.vars = config.vars || [];
  config.vars.forEach(function(varConfig) {
    setVar(state, varConfig);
  });
}
var $__default = setVars;
;
//# sourceURL=src/fns/input/set/set.vars.js