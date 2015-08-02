define("config-routes/fns/database/mongo/getRecords", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/database/mongo/getRecords";
  var Q = require('q');
  function getRecords(state, config) {
    var deferred = Q.defer();
    var mongoDB = state.get(config.mongoVarName);
    var collection = config.collection;
    var query = state.get(config.queryVarName) || config.query || {};
    var options = state.get(config.optionsVarName) || config.options || {};
    var resultHandler = function(err, result) {
      if (err) {
        state.set(config.saveErrorTo, err);
        deferred.reject(err);
      } else {
        state.set(config.saveResultTo, result);
        deferred.resolve(result);
      }
    };
    mongoDB.collection(collection).find(query, options).toArray(resultHandler);
    return deferred.promise;
  }
  var $__default = getRecords;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/database/mongo/getRecords.js