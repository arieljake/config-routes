"use strict";
Object.defineProperties(exports, {
  Route: {get: function() {
      return Route;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/routing/Route";
var path = require("path");
var q = require('q');
var _ = require('lodash');
var FnLibrary = require('./FnLibrary').FnLibrary;
var FnsRunner = require('./FnsRunner').FnsRunner;
var Context = require("./Context").Context;
var Route = function Route(name, definition, fnLib) {
  this.name = name;
  this.definition = definition;
  this.fnLib = fnLib;
};
($traceurRuntime.createClass)(Route, {
  getFns: function() {
    var $__0 = this;
    return this.definition.map((function(def) {
      return {
        name: def.fn,
        config: _.omit(def, "fn"),
        exe: $__0.fnLib.get(def.fn)
      };
    }));
  },
  run: function(req, res) {
    var model = {
      req: req,
      res: res
    };
    var context = new Context(model, this.fnLib);
    var fns = this.getFns();
    var boundFns = fns.map((function(fn) {
      return _.bind(fn.exe, null, context, fn.config);
    }));
    var runner = new FnsRunner(boundFns);
    return runner.run();
  }
}, {});
;
//# sourceURL=src/routing/Route.js