define("config-routes/fns/database/mongoskin/getRecord", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/database/mongoskin/getRecord";
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
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/database/mongoskin/getRecord.js