"use strict";
Object.defineProperties(exports, {
  Route: {get: function() {
      return Route;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/Route";
'use strict';
var Q = require('q');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var FnsRunner = require('./FnsRunner').FnsRunner;
var Route = function Route(id, name, steps, context) {
  this.id = id;
  this.name = name;
  this.steps = steps;
  this.context = context;
};
($traceurRuntime.createClass)(Route, {
  run: function() {
    var $__0 = this;
    var deferred = Q.defer();
    var boundFns = this.steps.map((function(step) {
      return step.getExecutable($__0.context);
    }));
    var runner = new FnsRunner(boundFns);
    this.attachToRunner(runner);
    runner.run().then(function() {
      deferred.resolve();
    }).catch((function(err) {
      var erroredStep = $__0.steps[err.fnIndex];
      var stepObj = erroredStep.toObject();
      var routeObj = $__0.toObject();
      $__0.emit('stepError', err.error, stepObj, routeObj);
      deferred.reject({
        error: err,
        step: stepObj,
        route: routeObj
      });
    }));
    return deferred.promise;
  },
  attachToRunner: function(fnRunner) {
    var $__0 = this;
    fnRunner.on('runnerStarting', (function(fnIndex) {
      $__0.emit('routeStarting', $__0.toObject());
    }));
    fnRunner.on('runnerComplete', (function(fnIndex) {
      $__0.emit('routeComplete', $__0.toObject());
    }));
    fnRunner.on('fnComplete', (function(fnIndex) {
      var completedStep = $__0.steps[fnIndex];
      $__0.emit('stepComplete', completedStep.toObject(), $__0.toObject());
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