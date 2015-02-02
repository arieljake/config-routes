"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/routing/array.of.names";
var FnsRunner = require("../../lib/FnsRunner").FnsRunner;
function stringToArray(state, config) {
  var fnNames = state.get(config.arrayAt);
  var fns = fnNames.map((function(name) {
    return state.getFnByName(name);
  }));
  var runner = new FnsRunner(fns);
  return new Promise(function(resolve, reject) {
    runner.run().then(function() {
      resolve();
    });
  });
}
var $__default = stringToArray;
;
//# sourceURL=src/fns/routing/array.of.names.js