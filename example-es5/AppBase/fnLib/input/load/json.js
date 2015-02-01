"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fnLib/input/load/json";
var $__fs__;
var fs = ($__fs__ = require("fs"), $__fs__ && $__fs__.__esModule && $__fs__ || {default: $__fs__}).default;
function loadJson(state, config) {
  var path = state.get(config.pathAt);
  var content = fs.readFileSync(path, "utf8");
  var value = JSON.parse(content);
  state.set(config.outputTo, value);
}
var $__default = loadJson;
;
//# sourceURL=src/fnLib/input/load/json.js