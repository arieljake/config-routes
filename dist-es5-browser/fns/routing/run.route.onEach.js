define("config-routes/fns/routing/run.route.onEach", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/routing/run.route.onEach";
  var Q = require("q");
  var async = require("async");
  var runRoute = require("./run.route").default;
  function runRouteOnEach(state, config) {
    var collection = state.get(config.collectionVarName);
    var inputVarName = config.inputVarName;
    var routeConfig = config.routeConfig;
    var itemKey = "__item_" + Math.random().toString().substr(2);
    var deferred = Q.defer();
    if (routeConfig.input === undefined) {
      routeConfig.input = {};
    }
    routeConfig.input[inputVarName] = itemKey;
    async.forEachSeries(collection, function(item, done) {
      state.set(itemKey, item);
      runRoute(state, routeConfig).then(function(result) {
        done();
      }).catch(function(err) {
        done(err);
      });
    }, function(err) {
      if (err)
        deferred.reject(err);
      else
        deferred.resolve();
    });
    return deferred.promise;
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