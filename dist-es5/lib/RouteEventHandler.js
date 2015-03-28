"use strict";
Object.defineProperties(exports, {
  RouteEventHandler: {get: function() {
      return RouteEventHandler;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteEventHandler";
'use strict';
var RouteEventHandler = function RouteEventHandler(eventHandlers) {
  this.eventHandlers = eventHandlers || {};
};
($traceurRuntime.createClass)(RouteEventHandler, {handle: function(route) {
    var $__0 = this;
    route.once("routeStarting", (function() {
      for (var args = [],
          $__2 = 0; $__2 < arguments.length; $__2++)
        args[$__2] = arguments[$__2];
      if ($__0.eventHandlers.routeStarting) {
        $__0.eventHandlers.routeStarting.apply(null, args);
      }
    }));
    route.on("stepComplete", (function() {
      for (var args = [],
          $__3 = 0; $__3 < arguments.length; $__3++)
        args[$__3] = arguments[$__3];
      if ($__0.eventHandlers.stepComplete) {
        $__0.eventHandlers.stepComplete.apply(null, args);
      }
    }));
    route.on("stepError", (function() {
      for (var args = [],
          $__4 = 0; $__4 < arguments.length; $__4++)
        args[$__4] = arguments[$__4];
      if ($__0.eventHandlers.stepError) {
        $__0.eventHandlers.stepError.apply(null, args);
      }
    }));
    route.once("routeComplete", (function() {
      for (var args = [],
          $__5 = 0; $__5 < arguments.length; $__5++)
        args[$__5] = arguments[$__5];
      if ($__0.eventHandlers.routeComplete) {
        $__0.eventHandlers.routeComplete.apply(null, args);
      }
      route.removeAllListeners();
    }));
  }}, {});
//# sourceURL=src/lib/RouteEventHandler.js