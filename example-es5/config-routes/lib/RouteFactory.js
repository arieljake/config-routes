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
  get: function(name) {
    var routeDefinition = this.routeLib.get(name);
    if (!routeDefinition)
      routeDefinition = this.routeLib.get("404");
    var route = new Route(name, routeDefinition, this.fnLib);
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