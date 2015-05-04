"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/database/mongoskin/findAndModify";
var Q = require('q');
var async = require('async');
var _ = require('lodash');
function findAndModify(state, config) {
  var deferred = Q.defer();
  var mongoDB = state.get(config.mongoVarName);
  var collection = config.collection;
  var query = config.query || state.get(config.queryVarName) || {};
  var update = config.update || state.get(config.updateVarName) || {};
  var options = config.options || state.get(config.optionsVarName) || {};
  var sort = config.sort || state.get(config.sortVarName);
  options.new = true;
  if (!sort) {
    sort = [['_id', 'asc']];
  }
  var resultHandler = function(err, result) {
    if (err) {
      state.set(config.saveErrorTo, err);
      deferred.reject(err);
    } else {
      state.set(config.saveResultTo, result);
      deferred.resolve(result);
    }
  };
  try {
    if (options)
      mongoDB.collection(collection).findAndModify(query, sort, update, options, resultHandler);
    else
      mongoDB.collection(collection).findAndModify(query, sort, update, resultHandler);
  } catch (err) {
    deferred.reject(err);
  }
  return deferred.promise;
}
var $__default = findAndModify;
;
//# sourceURL=src/fns/database/mongoskin/findAndModify.js