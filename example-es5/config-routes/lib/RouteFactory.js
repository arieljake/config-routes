"use strict";
Object.defineProperties(exports, {
  RouteFactory: {get: function() {
      return RouteFactory;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteFactory";
'use strict';
var Route = require('./Route').Route;
var RouteEventHandler = require('./RouteEventHandler').RouteEventHandler;
var RouteContext = require('./RouteContext').RouteContext;
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
    var route = new Route(name, routeDefinition, this.fnLib, context);
    this.addInputsToRoute(route);
    if (this.routeEventHandler)
      this.routeEventHandler.handle(route);
    return route;
  },
  addInputsToRoute: function(route) {
    var $__0 = this;
    Object.keys(this.routeInputs).map((function(inputKey) {
      var value = $__0.routeInputs[inputKey];
      route.context.set(inputKey, value);
    }));
  }
}, {});
//# sourceURL=src/lib/RouteFactory.js