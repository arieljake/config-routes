"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fnLib/input/copy";
function copy(state, config) {
  var value = state.get(config.valueAt);
  state.set(config.saveTo, value);
}
var $__default = copy;
;
//# sourceURL=src/fnLib/input/copy.js