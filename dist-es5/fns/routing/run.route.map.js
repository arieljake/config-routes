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
var __moduleName = "dist-es5/fns/routing/run.route.map";
var Q = require("q");
var async = require("async");
var runRoute = require("./run.route").default;
function runRouteMap(state, config) {
  var deferred = Q.defer();
  var collection = state.get(config.collectionVarName);
  var routeConfig = config.routeConfig;
  var itemKey = "__item_" + Math.random().toString().substr(2);
  var results = [];
  if (routeConfig.inputs === undefined)
    routeConfig.inputs = {};
  routeConfig.inputs[config.itemVarName] = itemKey;
  async.forEachSeries(collection, function(item, done) {
    state.set(itemKey, item);
    runRoute(state, routeConfig).then(function() {
      results.push(state.assemble(config.result));
      done();
    }).catch(function(err) {
      done(err);
    });
  }, function(err) {
    if (err) {
      deferred.reject(err);
    } else {
      if (config.saveTo)
        state.set(config.saveTo, results);
      deferred.resolve();
    }
  });
  return deferred.promise;
}
var $__default = runRouteMap;
;
function humanize(utils, config) {
  var output = utils.devariable("run route #routeName# as mapping fn", config);
  return output;
}
;
//# sourceURL=src/fns/routing/run.route.map.js