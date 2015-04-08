"use strict";
Object.defineProperties(exports, {
  Route: {get: function() {
      return Route;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/Route";
var $__q__,
    $__lodash__,
    $__dist_45_es5_47_lib_47_FnsRunner__;
'use strict';
var EventEmitter = require('events').EventEmitter;
var Q = ($__q__ = require("q"), $__q__ && $__q__.__esModule && $__q__ || {default: $__q__}).default;
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
var FnsRunner = ($__dist_45_es5_47_lib_47_FnsRunner__ = require("./FnsRunner"), $__dist_45_es5_47_lib_47_FnsRunner__ && $__dist_45_es5_47_lib_47_FnsRunner__.__esModule && $__dist_45_es5_47_lib_47_FnsRunner__ || {default: $__dist_45_es5_47_lib_47_FnsRunner__}).FnsRunner;
var Route = function Route(id, name, steps, context) {
  this.id = id;
  this.name = name;
  this.steps = steps;
  this.context = context;
};
($traceurRuntime.createClass)(Route, {
  run: function() {
    var $__3 = this;
    var deferred = Q.defer();
    var boundFns = this.steps.map((function(step) {
      return step.getExecutable($__3.context);
    }));
    var runner = new FnsRunner(boundFns);
    this.attachToRunner(runner);
    runner.run().then(function() {
      deferred.resolve();
    }).catch((function(err) {
      var erroredStep = $__3.steps[err.fnIndex];
      var stepObj = erroredStep.toObject();
      var routeObj = $__3.toObject();
      $__3.emit('stepError', err.error, stepObj, routeObj);
      deferred.reject({
        error: err,
        step: stepObj,
        route: routeObj
      });
    }));
    return deferred.promise;
  },
  attachToRunner: function(fnRunner) {
    var $__3 = this;
    fnRunner.on('runnerStarting', (function(fnIndex) {
      $__3.emit('routeStarting', $__3.toObject());
    }));
    fnRunner.on('runnerComplete', (function(fnIndex) {
      $__3.emit('routeComplete', $__3.toObject());
    }));
    fnRunner.on('fnComplete', (function(fnIndex) {
      var completedStep = $__3.steps[fnIndex];
      $__3.emit('stepComplete', completedStep.toObject(), $__3.toObject());
    }));
  },
  toObject: function() {
    return {
      id: this.id,
      name: this.name,
      state: this.context.toObject()
    };
  }
}, {}, EventEmitter);
;
//# sourceURL=src/lib/Route.js