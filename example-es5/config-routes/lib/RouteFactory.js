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
};
($traceurRuntime.createClass)(RouteFactory, {get: function(name) {
    var routeDefinition = this.routeLib.get(name);
    if (!routeDefinition)
      routeDefinition = this.routeLib.get("404");
    var route = new Route(name, routeDefinition, this.fnLib);
    if (this.routeEventHandler)
      this.routeEventHandler.handle(route);
    return route;
  }}, {});
//# sourceURL=src/lib/RouteFactory.js