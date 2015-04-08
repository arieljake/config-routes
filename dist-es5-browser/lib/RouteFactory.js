define("config-routes/lib/RouteFactory", ["uuid", "./Route", "./RouteEventHandler", "./RouteContext", "./RouteStep"], function($__0,$__2,$__4,$__6,$__8) {
  "use strict";
  var __moduleName = "config-routes/lib/RouteFactory";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__6 || !$__6.__esModule)
    $__6 = {default: $__6};
  if (!$__8 || !$__8.__esModule)
    $__8 = {default: $__8};
  'use strict';
  var uuid = $__0.default;
  var Route = $__2.Route;
  var RouteEventHandler = $__4.RouteEventHandler;
  var RouteContext = $__6.RouteContext;
  var RouteStep = $__8.RouteStep;
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
      var $__10 = this;
      return definition.map((function(stepDef, index) {
        var stepId = routeId + "." + index;
        var fnId = stepDef.fn;
        var desc = stepDef.desc;
        var stepConfig = stepDef.config;
        var stepFn = $__10.fnLib.get(fnId);
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
  return {
    get RouteFactory() {
      return RouteFactory;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/RouteFactory.js