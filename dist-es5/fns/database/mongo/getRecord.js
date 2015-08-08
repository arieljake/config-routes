"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/database/mongo/getRecord";
var Q = require('q');
var ObjectID = require('mongodb').ObjectID;
function getRecord(state, config) {
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
  mongoDB.collection(collection).findOne(query, options, resultHandler);
  return deferred.promise;
}
var $__default = getRecord;
;
//# sourceURL=src/fns/database/mongo/getRecord.js