"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/database/mongo/aggregate";
var Q = require('q');
function aggregate(state, config) {
  var deferred = Q.defer();
  var mongoDB = state.get(config.mongoVarName);
  var collection = config.collection;
  var query = config.query || state.get(config.queryVarName);
  var pipeline = config.pipeline || state.get(config.pipelineVarName);
  var options = config.options || state.get(config.optionsVarName) || null;
  if (!pipeline) {
    deferred.reject("no pipeline defined");
  } else {
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
    mongoDB.collection(collection).aggregate(pipeline, options, resultHandler);
  }
  return deferred.promise;
}
var $__default = aggregate;
;
//# sourceURL=src/fns/database/mongo/aggregate.js