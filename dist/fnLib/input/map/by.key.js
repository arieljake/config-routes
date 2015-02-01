"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist/fnLib/input/map/by.key";
function mapByKey(state, config) {
  var source = state.get(config.arrayAt);
  var lookup = state.get(config.mapAt);
  var result = source.map((function(key) {
    return lookup[key];
  }));
  state.set(config.outputTo, result);
}
var $__default = mapByKey;
;
//# sourceURL=fnLib/input/map/by.key.js