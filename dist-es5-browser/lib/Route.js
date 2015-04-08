define("config-routes/lib/Route", ["eventemitter3", "q", "lodash", "./FnsRunner"], function($__0,$__2,$__4,$__6) {
  "use strict";
  var __moduleName = "config-routes/lib/Route";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__6 || !$__6.__esModule)
    $__6 = {default: $__6};
  'use strict';
  var EventEmitter = $__0.default;
  var Q = $__2.default;
  var _ = $__4.default;
  var FnsRunner = $__6.FnsRunner;
  var Route = function Route(id, name, steps, context) {
    this.id = id;
    this.name = name;
    this.steps = steps;
    this.context = context;
  };
  ($traceurRuntime.createClass)(Route, {
    run: function() {
      var $__8 = this;
      var deferred = Q.defer();
      var boundFns = this.steps.map((function(step) {
        return step.getExecutable($__8.context);
      }));
      var runner = new FnsRunner(boundFns);
      this.attachToRunner(runner);
      runner.run().then(function() {
        deferred.resolve();
      }).catch((function(err) {
        var erroredStep = $__8.steps[err.fnIndex];
        var stepObj = erroredStep.toObject();
        var routeObj = $__8.toObject();
        $__8.emit('stepError', err.error, stepObj, routeObj);
        deferred.reject({
          error: err,
          step: stepObj,
          route: routeObj
        });
      }));
      return deferred.promise;
    },
    attachToRunner: function(fnRunner) {
      var $__8 = this;
      fnRunner.on('runnerStarting', (function(fnIndex) {
        $__8.emit('routeStarting', $__8.toObject());
      }));
      fnRunner.on('runnerComplete', (function(fnIndex) {
        $__8.emit('routeComplete', $__8.toObject());
      }));
      fnRunner.on('fnComplete', (function(fnIndex) {
        var completedStep = $__8.steps[fnIndex];
        $__8.emit('stepComplete', completedStep.toObject(), $__8.toObject());
      }));
    },
    toObject: function() {
      return {
        id: this.id,
        name: this.name,
        state: this.context.toObject()
      };
    }
  }, {}, EventEmitter);
  ;
  return {
    get Route() {
      return Route;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/Route.js