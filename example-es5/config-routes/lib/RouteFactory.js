"use strict";
Object.defineProperties(exports, {
  RouteFactory: {get: function() {
      return RouteFactory;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteFactory";
'use strict';
var uuid = require('uuid');
var Route = require('./Route').Route;
var RouteEventHandler = require('./RouteEventHandler').RouteEventHandler;
var RouteContext = require('./RouteContext').RouteContext;
var RouteStep = require('./RouteStep').RouteStep;
var RouteFactory = function RouteFactory(routeLib, fnLib, routeEvents) {
  this.routeLib = routeLib;
  this.fnLib = fnLib;
  this.routeEventHandler = new RouteEventHandler(routeEvents);
  this.routeInputs = {};
};
($traceurRuntime.createClass)(RouteFactory, {
  addRouteInput: function(name, value) {
    this.routeInputs[name] = value;
  },
  get: function(name, context) {
    var routeDefinition = this.routeLib.get(name);
    if (!routeDefinition)
      return undefined;
    return this.create(name, routeDefinition, context);
  },
  create: function(name, routeDefinition, context) {
    if (!context) {
      context = new RouteContext();
    }
    this.addInputsToContext(context);
    var routeId = uuid.v1();
    var steps = this.createStepsForRoute(routeId, routeDefinition);
    var route = new Route(routeId, name, steps, context);
    if (this.routeEventHandler)
      this.routeEventHandler.handle(route);
    return route;
  },
  createStepsForRoute: function(routeId, definition) {
    var $__0 = this;
    return definition.map((function(stepDef, index) {
      var stepId = routeId + "." + index;
      var fnId = stepDef.fn;
      var desc = stepDef.desc;
      var stepConfig = stepDef.config;
      var stepFn = $__0.fnLib.get(fnId);
      if (!stepFn)
        throw new Error("function not found: " + fnId);
      return new RouteStep(stepId, fnId, desc, stepFn, stepConfig);
    }));
  },
  addInputsToContext: function(context) {
    var $__0 = this;
    Object.keys(this.routeInputs).map((function(inputKey) {
      var value = $__0.routeInputs[inputKey];
      context.set(inputKey, value);
    }));
  }
}, {});
//# sourceURL=src/lib/RouteFactory.js