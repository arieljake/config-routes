"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist/fnLib/output/res.send.final";
function resSend(state, config) {
  var value = state.get(config.valueAt);
  var res = state.get("res");
  res.send(value);
}
var $__default = resSend;
;
//# sourceURL=fnLib/output/res.send.final.js