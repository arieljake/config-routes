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
var __moduleName = "dist-es5/fns/database/mongo/insertManyBatch";
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
    for (var i = 0; i < records.length; i++) {
      batch.insert(records[i], options);
    }
    batch.execute(resultHandler);
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
//# sourceURL=src/fns/database/mongo/insertManyBatch.js