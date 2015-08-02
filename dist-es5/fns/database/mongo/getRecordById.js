"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/database/mongo/getRecordById";
var Q = require('q');
var ObjectID = require('mongodb').ObjectID;
function getRecordById(state, config) {
  var deferred = Q.defer();
  var mongoDB = state.get(config.mongoVarName);
  var collection = config.collection;
  var recordId = state.get(config.recordIdVarName) || config.recordId;
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
  if (typeof recordId === 'string')
    recordId = new ObjectID(recordId);
  mongoDB.collection(collection).findOne({_id: recordId}, options, resultHandler);
  return deferred.promise;
}
var $__default = getRecordById;
;
//# sourceURL=src/fns/database/mongo/getRecordById.js