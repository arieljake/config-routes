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
var __moduleName = "dist-es5/fns/output/res.sendStatus";
function resSendStatus(state, config) {
  var res = state.get("res");
  res.sendStatus(config.status);
}
var $__default = resSendStatus;
;
function humanize(utils, config) {
  return "Send 404";
}
;
//# sourceURL=src/fns/output/res.sendStatus.js