"use strict";
Object.defineProperties(exports, {
  Route: {get: function() {
      return Route;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/Route";
var path = require("path");
var q = require('q');
var _ = require('lodash');
var uuid = require('uuid');
var EventEmitter = require('events').EventEmitter;
var FnLibrary = require('./FnLibrary').FnLibrary;
var FnsRunner = require('./FnsRunner').FnsRunner;
var RouteContext = require("./RouteContext").RouteContext;
var Route = function Route(name, definition, fnLib) {
  this.id = uuid.v1();
  this.name = name;
  this.definition = definition;
  this.fnLib = fnLib;
  this.fns = this.getFns();
};
($traceurRuntime.createClass)(Route, {
  getFns: function() {
    var $__0 = this;
    return this.definition.map((function(def, index) {
      return {
        name: def.fn,
        config: def.config,
        exe: $__0.fnLib.get(def.fn),
        index: index
      };
    }));
  },
  run: function(req, res) {
    var $__0 = this;
    this.context = new RouteContext(req, res, this.fnLib);
    var boundFns = this.fns.map((function(fn) {
      return _.bind(fn.exe, null, $__0.context, fn.config);
    }));
    var runner = new FnsRunner(boundFns);
    this.attachToRunner(runner);
    runner.run().catch((function(err) {
      var erroredFn = $__0.fns[err.fnIndex];
      $__0.emit('routeFnError', err.error, $__0.fnToObject(erroredFn), $__0.toObject());
    }));
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
      var completedFn = $__0.fns[fnIndex];
      $__0.emit('routeFnComplete', $__0.fnToObject(completedFn), $__0.toObject());
    }));
  },
  toObject: function() {
    return {
      id: this.id,
      name: this.name,
      definition: this.definition,
      state: this.context.serialize()
    };
  },
  fnToObject: function(fn) {
    return {
      name: fn.name,
      config: fn.config,
      index: fn.index
    };
  }
}, {}, EventEmitter);
;
//# sourceURL=src/lib/Route.js