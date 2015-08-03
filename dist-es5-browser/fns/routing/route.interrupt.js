define("config-routes/fns/routing/route.interrupt", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/routing/route.interrupt";
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
  return {
    get default() {
      return $__default;
    },
    get humanize() {
      return humanize;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/routing/route.interrupt.js