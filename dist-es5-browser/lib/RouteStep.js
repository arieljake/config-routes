define("config-routes/lib/RouteStep", ["lodash"], function($__0) {
  "use strict";
  var __moduleName = "config-routes/lib/RouteStep";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  'use strict';
  var _ = $__0.default;
  var RouteStep = function RouteStep(id, name, desc, stepFn, stepConfig) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.stepFn = stepFn;
    this.stepConfig = stepConfig;
  };
  ($traceurRuntime.createClass)(RouteStep, {
    getExecutable: function(context) {
      return _.bind(this.stepFn, null, context, this.stepConfig);
    },
    toObject: function() {
      return {
        id: this.id,
        name: this.name,
        desc: this.desc
      };
    }
  }, {});
  ;
  return {
    get RouteStep() {
      return RouteStep;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/RouteStep.js