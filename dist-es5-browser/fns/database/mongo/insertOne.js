define("config-routes/fns/database/mongo/insertOne", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/database/mongo/insertOne";
  var Q = require('q');
  var _ = require('lodash');
  function insertOne(state, config) {
    try {
      var deferred = Q.defer();
      var mongoDB = state.get(config.mongoVarName);
      var collection = config.collection;
      var record = state.get(config.recordVarName) || config.record || {};
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
      mongoDB.collection(collection).insertOne(record, options, resultHandler);
    } catch (err) {
      deferred.reject(err);
    }
    return deferred.promise;
  }
  var $__default = insertOne;
  ;
  function humanize(utils, config) {
    var output = utils.devariable("save #recordVarName# in the #collection# table", config);
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
//# sourceURL=src/fns/database/mongo/insertOne.js