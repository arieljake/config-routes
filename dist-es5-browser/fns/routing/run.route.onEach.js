define("config-routes/fns/routing/run.route.onEach", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/routing/run.route.onEach";
  var Q = require("q");
  var runRoute = require("./run.route").default;
  function runRouteOnEach(state, config) {
    var collection = state.get(config.collectionVarName);
    var routeConfig = config.routeConfig;
    var inputVarName = config.inputVarName;
    var itemKey = "__item_" + Math.random().toString().substr(2);
    if (routeConfig.input === undefined) {
      routeConfig.input = {};
    }
    routeConfig.input[inputVarName] = itemKey;
    var routePromises = collection.map(function(item) {
      state.set(itemKey, item);
      return runRoute(state, routeConfig);
    });
    return Q.all(routePromises);
  }
  var $__default = runRouteOnEach;
  ;
  function humanize(utils, config) {
    var output = utils.devariable("run route #routeName# on each", config);
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
//# sourceURL=src/fns/routing/run.route.onEach.js