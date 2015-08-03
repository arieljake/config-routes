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
var __moduleName = "dist-es5/fns/routing/route.interrupt";
var Q = require("q");
function routeInterrupt(state, config) {
  var deferred = Q.defer();
  deferred.reject(true);
  return deferred.promise;
}
var $__default = routeInterrupt;
;
function humanize(utils, config) {
  var output = utils.devariable("route interrupt", config);
  return output;
}
;
//# sourceURL=src/fns/routing/route.interrupt.js