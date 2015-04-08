define("config-routes/fns/database/mongoskin/deleteRecords", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/database/mongoskin/deleteRecords";
  var Q = require('q');
  function deleteRecords(state, config) {
    var deferred = Q.defer();
    var mongoDB = state.get(config.mongoVarName);
    var collection = config.collection;
    var query = config.query || state.get(config.queryVarName) || {};
    var resultHandler = function(err, result) {
      if (err) {
        state.set(config.saveErrorTo, err);
        deferred.reject(err);
      } else {
        state.set(config.saveResultTo, result);
        deferred.resolve(result);
      }
    };
    mongoDB.collection(collection).remove(query, resultHandler);
    return deferred.promise;
  }
  var $__default = deleteRecords;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/database/mongoskin/deleteRecords.js