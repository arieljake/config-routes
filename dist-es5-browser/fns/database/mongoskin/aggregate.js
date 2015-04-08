define("config-routes/fns/database/mongoskin/aggregate", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/database/mongoskin/aggregate";
  var Q = require('q');
  function aggregate(state, config) {
    var deferred = Q.defer();
    var mongoDB = state.get(config.mongoVarName);
    var collection = config.collection;
    var query = config.query || state.get(config.queryVarName);
    var steps = config.steps || state.get(config.stepsVarName) || [];
    if (query)
      steps.unshift({"$match": query});
    var resultHandler = function(err, result) {
      if (err) {
        state.set(config.saveErrorTo, err);
        deferred.reject(err);
      } else {
        state.set(config.saveResultTo, result);
        deferred.resolve(result);
      }
    };
    mongoDB.collection(collection).aggregate(steps, resultHandler);
    return deferred.promise;
  }
  var $__default = aggregate;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/database/mongoskin/aggregate.js