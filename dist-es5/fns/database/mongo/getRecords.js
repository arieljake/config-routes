"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/database/mongo/getRecords";
function getRecords(state, config) {
  var value = [{name: "ARIEL"}, {name: "JAKE"}];
  state.set(config.saveTo, value);
}
var $__default = getRecords;
;
//# sourceURL=src/fns/database/mongo/getRecords.js