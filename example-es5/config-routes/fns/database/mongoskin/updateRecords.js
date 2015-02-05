"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/database/mongoskin/updateRecords";
var Q = require('q');
var async = require('async');
var _ = require('lodash');
function updateRecords(state, config) {
  var deferred = Q.defer();
  var mongoDB = state.get(config.mongoVarName);
  var collection = config.collection;
  var records = state.get(config.recordsVarName) || config.records || {};
  var options = state.get(config.optionsVarName) || config.options || {};
  var results = [];
  var errors = [];
  var saveErrAndResult = function(err, result) {
    if (err) {
      errors.push(err);
    } else {
      results.push(result);
    }
  };
  async.forEachSeries(records, function(record, done) {
    var query = {_id: record._id};
    mongoDB.collection(collection).update(query, record, options, function(err, result) {
      saveErrAndResult(err, result);
      done();
    });
  }, function() {
    state.set(config.saveErrorTo, errors);
    state.set(config.saveResultTo, results);
    if (errors.length > 0)
      deferred.reject(errors);
    else
      deferred.resolve(results);
  });
  return deferred.promise;
}
var $__default = updateRecords;
;
//# sourceURL=src/fns/database/mongoskin/updateRecords.js