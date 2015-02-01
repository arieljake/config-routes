"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist/fnLib/fns/run/array.of.names";
var FnsRunner = require("../../../objects/FnsRunner").FnsRunner;
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
//# sourceURL=fnLib/fns/run/array.of.names.js