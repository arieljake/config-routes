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
var __moduleName = "dist-es5/fns/input/del.vars";
var DelVar = require('./del.var');
function delVars(state, config) {
  config.vars = config.vars || [];
  config.vars.forEach(function(varConfig) {
    DelVar.default(state, varConfig);
  });
}
var $__default = delVars;
;
function humanize(utils, config) {
  var output = utils.devariable("delete multiple variables in state", config);
  return output;
}
;
//# sourceURL=src/fns/input/del.vars.js