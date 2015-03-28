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
var __moduleName = "dist-es5/fns/output/res.send";
function resSend(state, config) {
  var res = state.get(config.responseVarName);
  var value;
  if (config.value) {
    value = config.value;
  } else if (config.valueVarName) {
    value = state.get(config.valueVarName);
  }
  res.send(value);
}
var $__default = resSend;
;
function humanize(utils, config) {
  var output;
  if (config.value) {
    output = utils.devariable("send #value#", config);
  } else if (config.valueVarName) {
    output = utils.devariable("send value at #valueVarName#", config);
  }
  return output;
}
;
//# sourceURL=src/fns/output/res.send.js