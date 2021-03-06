define("config-routes/fns/database/mongo/insertManyBatch", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/database/mongo/insertManyBatch";
  var Q = require('q');
  var _ = require('lodash');
  function insertManyBatch(state, config) {
    try {
      var deferred = Q.defer();
      var mongoDB = state.get(config.mongoVarName);
      var collection = config.collection;
      var records = state.get(config.recordsVarName) || config.records || [];
      var options = state.get(config.optionsVarName) || config.options || {};
      var resultHandler = function(err, result) {
        if (err) {
          state.set(config.saveErrorTo, err);
        }
        if (result) {
          state.set(config.saveResultTo, result);
        }
        deferred.resolve(result);
      };
      var batch = mongoDB.collection(collection).initializeUnorderedBulkOp();
      if (records.length > 0) {
        for (var i = 0; i < records.length; i++) {
          batch.insert(records[i], options);
        }
        batch.execute(resultHandler);
      } else {
        if (config.protectEmptySet === true)
          deferred.resolve([]);
        else
          deferred.reject("no records provided to insert (allow with protectEmptySet:true)");
      }
    } catch (err) {
      deferred.reject(err);
    }
    return deferred.promise;
  }
  var $__default = insertManyBatch;
  ;
  function humanize(utils, config) {
    var output = utils.devariable("save #recordsVarName# in the #collection# table", config);
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
//# sourceURL=src/fns/database/mongo/insertManyBatch.js