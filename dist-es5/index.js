"use strict";
Object.defineProperties(exports, {
  createRoutes: {get: function() {
      return createRoutes;
    }},
  createLibrary: {get: function() {
      return createLibrary;
    }},
  createContext: {get: function() {
      return createContext;
    }},
  Filter: {get: function() {
      return Filter;
    }},
  Formatter: {get: function() {
      return Formatter;
    }},
  utils: {get: function() {
      return utils;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/index";
var $__lodash__,
    $__dist_45_es5_47_lib_47_Library__,
    $__dist_45_es5_47_lib_47_RouteFactory__,
    $__dist_45_es5_47_lib_47_RouteLibrary__,
    $__dist_45_es5_47_lib_47_RouteContext__,
    $__dist_45_es5_47_lib_47_FnLibrary__,
    $__dist_45_es5_47_lib_47_Filter__,
    $__dist_45_es5_47_lib_47_Formatter__,
    $__dist_45_es5_47_utils_47_ObjectPath__,
    $__dist_45_es5_47_utils_47_VariableString__;
global.$traceurRuntime = require('traceur-runtime');
var path = require("path");
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
var Library = ($__dist_45_es5_47_lib_47_Library__ = require("./lib/Library"), $__dist_45_es5_47_lib_47_Library__ && $__dist_45_es5_47_lib_47_Library__.__esModule && $__dist_45_es5_47_lib_47_Library__ || {default: $__dist_45_es5_47_lib_47_Library__}).Library;
var RouteFactory = ($__dist_45_es5_47_lib_47_RouteFactory__ = require("./lib/RouteFactory"), $__dist_45_es5_47_lib_47_RouteFactory__ && $__dist_45_es5_47_lib_47_RouteFactory__.__esModule && $__dist_45_es5_47_lib_47_RouteFactory__ || {default: $__dist_45_es5_47_lib_47_RouteFactory__}).RouteFactory;
var RouteLibrary = ($__dist_45_es5_47_lib_47_RouteLibrary__ = require("./lib/RouteLibrary"), $__dist_45_es5_47_lib_47_RouteLibrary__ && $__dist_45_es5_47_lib_47_RouteLibrary__.__esModule && $__dist_45_es5_47_lib_47_RouteLibrary__ || {default: $__dist_45_es5_47_lib_47_RouteLibrary__}).RouteLibrary;
var RouteContext = ($__dist_45_es5_47_lib_47_RouteContext__ = require("./lib/RouteContext"), $__dist_45_es5_47_lib_47_RouteContext__ && $__dist_45_es5_47_lib_47_RouteContext__.__esModule && $__dist_45_es5_47_lib_47_RouteContext__ || {default: $__dist_45_es5_47_lib_47_RouteContext__}).RouteContext;
var FnLibrary = ($__dist_45_es5_47_lib_47_FnLibrary__ = require("./lib/FnLibrary"), $__dist_45_es5_47_lib_47_FnLibrary__ && $__dist_45_es5_47_lib_47_FnLibrary__.__esModule && $__dist_45_es5_47_lib_47_FnLibrary__ || {default: $__dist_45_es5_47_lib_47_FnLibrary__}).FnLibrary;
var Filter = ($__dist_45_es5_47_lib_47_Filter__ = require("./lib/Filter"), $__dist_45_es5_47_lib_47_Filter__ && $__dist_45_es5_47_lib_47_Filter__.__esModule && $__dist_45_es5_47_lib_47_Filter__ || {default: $__dist_45_es5_47_lib_47_Filter__}).Filter;
var Formatter = ($__dist_45_es5_47_lib_47_Formatter__ = require("./lib/Formatter"), $__dist_45_es5_47_lib_47_Formatter__ && $__dist_45_es5_47_lib_47_Formatter__.__esModule && $__dist_45_es5_47_lib_47_Formatter__ || {default: $__dist_45_es5_47_lib_47_Formatter__}).Formatter;
var ObjectPath = ($__dist_45_es5_47_utils_47_ObjectPath__ = require("./utils/ObjectPath"), $__dist_45_es5_47_utils_47_ObjectPath__ && $__dist_45_es5_47_utils_47_ObjectPath__.__esModule && $__dist_45_es5_47_utils_47_ObjectPath__ || {default: $__dist_45_es5_47_utils_47_ObjectPath__}).ObjectPath;
var VariableString = ($__dist_45_es5_47_utils_47_VariableString__ = require("./utils/VariableString"), $__dist_45_es5_47_utils_47_VariableString__ && $__dist_45_es5_47_utils_47_VariableString__.__esModule && $__dist_45_es5_47_utils_47_VariableString__ || {default: $__dist_45_es5_47_utils_47_VariableString__}).VariableString;
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
function createContext(state) {
  return new RouteContext(state);
}
;
;
;
var utils = {
  ObjectPath: ObjectPath,
  VariableString: VariableString
};
//# sourceURL=src/index.js