"use strict";
Object.defineProperties(exports, {
  RouteFactory: {get: function() {
      return RouteFactory;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteFactory";
var $__uuid__,
    $__dist_45_es5_47_lib_47_Route__,
    $__dist_45_es5_47_lib_47_RouteEventHandler__,
    $__dist_45_es5_47_lib_47_RouteContext__,
    $__dist_45_es5_47_lib_47_RouteStep__;
'use strict';
var uuid = ($__uuid__ = require("uuid"), $__uuid__ && $__uuid__.__esModule && $__uuid__ || {default: $__uuid__}).default;
var Route = ($__dist_45_es5_47_lib_47_Route__ = require("./Route"), $__dist_45_es5_47_lib_47_Route__ && $__dist_45_es5_47_lib_47_Route__.__esModule && $__dist_45_es5_47_lib_47_Route__ || {default: $__dist_45_es5_47_lib_47_Route__}).Route;
var RouteEventHandler = ($__dist_45_es5_47_lib_47_RouteEventHandler__ = require("./RouteEventHandler"), $__dist_45_es5_47_lib_47_RouteEventHandler__ && $__dist_45_es5_47_lib_47_RouteEventHandler__.__esModule && $__dist_45_es5_47_lib_47_RouteEventHandler__ || {default: $__dist_45_es5_47_lib_47_RouteEventHandler__}).RouteEventHandler;
var RouteContext = ($__dist_45_es5_47_lib_47_RouteContext__ = require("./RouteContext"), $__dist_45_es5_47_lib_47_RouteContext__ && $__dist_45_es5_47_lib_47_RouteContext__.__esModule && $__dist_45_es5_47_lib_47_RouteContext__ || {default: $__dist_45_es5_47_lib_47_RouteContext__}).RouteContext;
var RouteStep = ($__dist_45_es5_47_lib_47_RouteStep__ = require("./RouteStep"), $__dist_45_es5_47_lib_47_RouteStep__ && $__dist_45_es5_47_lib_47_RouteStep__.__esModule && $__dist_45_es5_47_lib_47_RouteStep__ || {default: $__dist_45_es5_47_lib_47_RouteStep__}).RouteStep;
var RouteFactory = function RouteFactory(routeLib, fnLib, routeEvents) {
  this.routeLib = routeLib;
  this.fnLib = fnLib;
  this.routeEventHandler = new RouteEventHandler(routeEvents);
  this.routeInputs = [];
};
($traceurRuntime.createClass)(RouteFactory, {
  addRouteInput: function(name, value, isInherited, isIgnoredOnDump) {
    this.routeInputs.push({
      name: name,
      value: value,
      inherited: isInherited,
      ignored: isIgnoredOnDump
    });
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
      this.addInputsToContext(context);
    }
    var routeId = uuid.v1();
    var steps = this.createStepsForRoute(routeId, routeDefinition);
    var route = new Route(routeId, name, steps, context);
    if (this.routeEventHandler)
      this.routeEventHandler.handle(route);
    return route;
  },
  createStepsForRoute: function(routeId, definition) {
    var $__5 = this;
    return definition.map((function(stepDef, index) {
      var stepId = routeId + "." + index;
      var fnId = stepDef.fn;
      var desc = stepDef.desc;
      var stepConfig = stepDef.config;
      var stepFn = $__5.fnLib.get(fnId);
      if (!stepFn)
        throw new Error("function not found: " + fnId);
      return new RouteStep(stepId, fnId, desc, stepFn, stepConfig);
    }));
  },
  addInputsToContext: function(context) {
    this.routeInputs.forEach(function(input) {
      context.set(input.name, input.value, input.inherited, input.ignored);
    });
  }
}, {});
//# sourceURL=src/lib/RouteFactory.js