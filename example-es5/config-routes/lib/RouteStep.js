"use strict";
Object.defineProperties(exports, {
  RouteStep: {get: function() {
      return RouteStep;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteStep";
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
  getExecutable: function(context) {
    var stepFn = this.fnLib.get(this.definition.fn);
    var executable = _.bind(stepFn, null, context, this.definition.config);
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