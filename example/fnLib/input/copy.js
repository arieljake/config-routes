"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist/fnLib/input/copy";
function copy(state, config) {
  var value = state.get(config.valueAt);
  state.set(config.outputTo, value);
}
var $__default = copy;
;
//# sourceURL=fnLib/input/copy.js