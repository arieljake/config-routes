"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/database/mongoskin/getRecord";
var Q = require('q');
function getRecord(state, config) {
  var deferred = Q.defer();
  var mongoDB = state.get(config.mongoVarName);
  var collection = config.collection;
  var query = state.get(config.queryVarName) || config.query || {};
  var options = state.get(config.optionsVarName) || config.options || {};
  var resultHandler = function(err, items) {
    if (err) {
      state.set(config.saveErrorTo, err);
      deferred.reject(err);
    } else if (items.length > 1) {
      state.set(config.saveErrorTo, items.length + " items returned");
      deferred.reject(items.length + " items returned");
    } else if (items.length === 0) {
      state.set(config.saveResultTo, null);
      deferred.resolve(null);
    } else {
      var result = items[0];
      state.set(config.saveResultTo, result);
      deferred.resolve(result);
    }
  };
  mongoDB.collection(collection).find(query, options).toArray(resultHandler);
  return deferred.promise;
}
var $__default = getRecord;
;
//# sourceURL=src/fns/database/mongoskin/getRecord.js