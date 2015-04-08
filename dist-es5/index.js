"use strict";
Object.defineProperties(exports, {
  createRoutes: {get: function() {
      return createRoutes;
    }},
  createLibrary: {get: function() {
      return createLibrary;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/index";
var $__lodash__,
    $__dist_45_es5_47_lib_47_RouteFactory__,
    $__dist_45_es5_47_lib_47_FnLibrary__,
    $__dist_45_es5_47_lib_47_RouteLibrary__,
    $__dist_45_es5_47_lib_47_Library__;
global.$traceurRuntime = require('traceur-runtime');
var path = require("path");
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
var RouteFactory = ($__dist_45_es5_47_lib_47_RouteFactory__ = require("./lib/RouteFactory"), $__dist_45_es5_47_lib_47_RouteFactory__ && $__dist_45_es5_47_lib_47_RouteFactory__.__esModule && $__dist_45_es5_47_lib_47_RouteFactory__ || {default: $__dist_45_es5_47_lib_47_RouteFactory__}).RouteFactory;
var FnLibrary = ($__dist_45_es5_47_lib_47_FnLibrary__ = require("./lib/FnLibrary"), $__dist_45_es5_47_lib_47_FnLibrary__ && $__dist_45_es5_47_lib_47_FnLibrary__.__esModule && $__dist_45_es5_47_lib_47_FnLibrary__ || {default: $__dist_45_es5_47_lib_47_FnLibrary__}).FnLibrary;
var RouteLibrary = ($__dist_45_es5_47_lib_47_RouteLibrary__ = require("./lib/RouteLibrary"), $__dist_45_es5_47_lib_47_RouteLibrary__ && $__dist_45_es5_47_lib_47_RouteLibrary__.__esModule && $__dist_45_es5_47_lib_47_RouteLibrary__ || {default: $__dist_45_es5_47_lib_47_RouteLibrary__}).RouteLibrary;
var Library = ($__dist_45_es5_47_lib_47_Library__ = require("./lib/Library"), $__dist_45_es5_47_lib_47_Library__ && $__dist_45_es5_47_lib_47_Library__.__esModule && $__dist_45_es5_47_lib_47_Library__ || {default: $__dist_45_es5_47_lib_47_Library__}).Library;
function createRoutes(config) {
  var stdFnLibPath = path.join(__dirname, "fns");
  var fnPaths = _.flatten([stdFnLibPath, config.fnLib]);
  var fnLib = new FnLibrary(fnPaths);
  var routeLib = new RouteLibrary(config.routeLib);
  var routes = new RouteFactory(routeLib, fnLib, config.routeEvents);
  return routes;
}
;
function createLibrary(libDirs, fileNameRegex, getDecorator) {
  var lib = new Library(libDirs, fileNameRegex);
  if (getDecorator) {
    lib.get = function(id) {
      var entry = lib.getById(id);
      if (!entry)
        return undefined;
      var result = getDecorator(entry);
      return result;
    };
  }
  return lib;
}
;
//# sourceURL=src/index.js