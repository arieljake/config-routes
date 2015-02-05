"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/database/mongoskin/deleteRecords";
var Q = require('q');
function deleteRecords(state, config) {
  var deferred = Q.defer();
  var mongoDB = state.get(config.mongoVarName);
  var collection = config.collection;
  var query = state.get(config.queryVarName) || config.query || {};
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
//# sourceURL=src/fns/database/mongoskin/deleteRecords.js