"use strict";
Object.defineProperties(exports, {
  RouteStep: {get: function() {
      return RouteStep;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteStep";
'use strict';
var q = require('q');
var _ = require('lodash');
var uuid = require('uuid');
var RouteStep = function RouteStep(definition, fnLib, index) {
  this.id = uuid.v1();
  this.definition = definition;
  this.fnLib = fnLib;
  this.index = index;
};
($traceurRuntime.createClass)(RouteStep, {
  get name() {
    return this.definition.fn;
  },
  get desc() {
    return this.definition.desc;
  },
  get hasErrorHandler() {
    return this.definition.hasOwnProperty("onError");
  },
  getExecutable: function(context) {
    var stepFn = this.fnLib.get(this.definition.fn);
    if (!stepFn)
      throw new Error("function not found: " + this.definition.fn);
    var executable = _.bind(stepFn, null, context, this.definition.config);
    return executable;
  },
  getErrorHandler: function(context) {
    var stepFn = this.fnLib.get(this.definition.onError.fn);
    if (!stepFn)
      throw new Error("route step has no error handler");
    var executable = _.bind(stepFn, null, context, this.definition.onError.config);
    return executable;
  },
  toObject: function() {
    return {
      id: this.id,
      name: this.name,
      config: this.definition,
      index: this.index
    };
  }
}, {});
;
//# sourceURL=src/lib/RouteStep.js