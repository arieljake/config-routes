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
    var $__0 = this;
    var routeDefinition = this.routeLib.get(name);
    if (routeDefinition) {
      return (function(req, res) {
        var route = new Route(name, routeDefinition, $__0.fnLib);
        if ($__0.routeEventHandler)
          $__0.routeEventHandler.handle(route);
        route.run(req, res);
      });
    } else {
      return (function(req, res) {
        res.sendStatus(404);
      });
    }
  }}, {});
//# sourceURL=src/lib/RouteFactory.js