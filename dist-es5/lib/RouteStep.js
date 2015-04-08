"use strict";
Object.defineProperties(exports, {
  RouteStep: {get: function() {
      return RouteStep;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteStep";
var $__lodash__;
'use strict';
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
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
//# sourceURL=src/lib/RouteStep.js