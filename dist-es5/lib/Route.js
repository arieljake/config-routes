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
var uuid = require('uuid');
var EventEmitter = require('events').EventEmitter;
var FnsRunner = require('./FnsRunner').FnsRunner;
var Step = require('./RouteStep').RouteStep;
var Route = function Route(name, definition, fnLib, context) {
  this.id = uuid.v1();
  this.name = name;
  this.definition = definition;
  this.fnLib = fnLib;
  this.context = context;
  this.steps = this.getSteps();
};
($traceurRuntime.createClass)(Route, {
  getSteps: function() {
    var $__0 = this;
    return this.definition.map((function(stepDef, index) {
      var step = new Step(stepDef, $__0.fnLib);
      step.index = index;
      return step;
    }));
  },
  get desc() {
    return this.steps.map((function(step) {
      return step.desc;
    })).join("<br>");
  },
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
      $__0.emit('stepError', err.error, erroredStep.toObject(), $__0.toObject());
      if (erroredStep.hasErrorHandler) {
        var errorHandler = erroredStep.getErrorHandler($__0.context);
        errorHandler();
      }
      deferred.reject(err);
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
    var hiddenContextKeys = _.filter(Object.keys(this.context), function(key) {
      return key.indexOf("_") === 0;
    });
    return {
      id: this.id,
      name: this.name,
      fnLib: this.fnLib.toObject(),
      definition: this.definition,
      state: _.omit(this.context.toObject(), hiddenContextKeys)
    };
  }
}, {}, EventEmitter);
;
//# sourceURL=src/lib/Route.js