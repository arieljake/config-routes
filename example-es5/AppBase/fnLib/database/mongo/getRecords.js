"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fnLib/database/mongo/getRecords";
function getRecords(state, config) {
  var value = [{name: "ARIEL"}, {name: "JAKE"}];
  state.set(config.outputTo, value);
}
var $__default = getRecords;
;
//# sourceURL=src/fnLib/database/mongo/getRecords.js