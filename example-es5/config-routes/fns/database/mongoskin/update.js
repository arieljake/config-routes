"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/database/mongoskin/update";
var Q = require('q');
var async = require('async');
var _ = require('lodash');
function update(state, config) {
  var deferred = Q.defer();
  var mongoDB = state.get(config.mongoVarName);
  var collection = config.collection;
  var query = state.get(config.queryVarName) || config.query || {};
  var update = state.get(config.updateVarName) || config.update || {};
  var resultHandler = function(err, result) {
    if (err) {
      state.set(config.saveErrorTo, err);
      deferred.reject(err);
    } else {
      state.set(config.saveResultTo, result);
      deferred.resolve(result);
    }
  };
  mongoDB.collection(collection).update(query, update, resultHandler);
  return deferred.promise;
}
var $__default = update;
;
//# sourceURL=src/fns/database/mongoskin/update.js