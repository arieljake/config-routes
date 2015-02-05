"use strict";
Object.defineProperties(exports, {
  createRoutes: {get: function() {
      return createRoutes;
    }},
  createRouteWriter: {get: function() {
      return createRouteWriter;
    }},
  createLibrary: {get: function() {
      return createLibrary;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/index";
global.$traceurRuntime = require('traceur-runtime');
var path = require("path");
var _ = require("lodash");
var RouteFactory = require('./lib/RouteFactory').RouteFactory;
var FnLibrary = require('./lib/FnLibrary').FnLibrary;
var RouteLibrary = require('./lib/RouteLibrary').RouteLibrary;
var StepWriter = require('./lib/StepWriter').StepWriter;
var RouteWriter = require('./lib/RouteWriter').RouteWriter;
var Library = require('./lib/Library').Library;
function createRoutes(config) {
  var stdFnLibPath = path.join(__dirname, "fns");
  var fnPaths = _.flatten([stdFnLibPath, config.fnLib]);
  var fnLib = new FnLibrary(fnPaths);
  var routeLib = new RouteLibrary(config.routeLib);
  var routes = new RouteFactory(routeLib, fnLib, config.routeEvents);
  return routes;
}
;
function createRouteWriter(config) {
  var stdFnLibPath = path.join(__dirname, "fns");
  var fnPaths = _.flatten([stdFnLibPath, config.fnLib]);
  var fnLib = new FnLibrary(fnPaths);
  var routeLib = new RouteLibrary(config.routeLib);
  var stepWriter = new StepWriter(fnLib);
  var routeWriter = new RouteWriter(routeLib, stepWriter);
  return routeWriter;
}
;
function createLibrary(libDirs, fileNameRegex) {
  var lib = new Library(libDirs, fileNameRegex);
  return lib;
}
;
//# sourceURL=src/index.js