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
var __moduleName = "dist-es5/fns/input/del.var";
function delVar(state, config) {
  var value;
  state.unset(config.valueVarName);
}
var $__default = delVar;
;
function humanize(utils, config) {
  var output = utils.devariable("delete #valueVarName# in state", config);
  return output;
}
;
//# sourceURL=src/fns/input/del.var.js