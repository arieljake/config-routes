"use strict";
Object.defineProperties(exports, {
  RouteEventHandler: {get: function() {
      return RouteEventHandler;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/routing/RouteEventHandler";
var RouteEventHandler = function RouteEventHandler(eventHandlers) {
  this.eventHandlers = eventHandlers;
};
($traceurRuntime.createClass)(RouteEventHandler, {handle: function(route) {
    var $__0 = this;
    route.once("routeStarting", (function() {
      for (var args = [],
          $__2 = 0; $__2 < arguments.length; $__2++)
        args[$__2] = arguments[$__2];
      if ($__0.eventHandlers.starting) {
        $__0.eventHandlers.starting.apply(null, args);
      }
    }));
    route.on("routeFnComplete", (function() {
      for (var args = [],
          $__3 = 0; $__3 < arguments.length; $__3++)
        args[$__3] = arguments[$__3];
      if ($__0.eventHandlers.fnComplete) {
        $__0.eventHandlers.fnComplete.apply(null, args);
      }
    }));
    route.once("routeComplete", (function() {
      for (var args = [],
          $__4 = 0; $__4 < arguments.length; $__4++)
        args[$__4] = arguments[$__4];
      if ($__0.eventHandlers.complete) {
        $__0.eventHandlers.complete.apply(null, args);
      }
      route.removeAllListeners();
    }));
  }}, {});
//# sourceURL=src/routing/RouteEventHandler.js