define("config-routes/index", ["lodash", "./lib/Library", "./lib/RouteFactory", "./lib/RouteLibrary", "./lib/RouteContext", "./lib/FnLibrary", "./utils/ObjectPath", "./utils/VariableString"], function($__0,$__2,$__4,$__6,$__8,$__10,$__12,$__14) {
  "use strict";
  var __moduleName = "config-routes/index";
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
  if (!$__10 || !$__10.__esModule)
    $__10 = {default: $__10};
  if (!$__12 || !$__12.__esModule)
    $__12 = {default: $__12};
  if (!$__14 || !$__14.__esModule)
    $__14 = {default: $__14};
  global.$traceurRuntime = require('traceur-runtime');
  var path = require("path");
  var _ = $__0.default;
  var Library = $__2.Library;
  var RouteFactory = $__4.RouteFactory;
  var RouteLibrary = $__6.RouteLibrary;
  var RouteContext = $__8.RouteContext;
  var FnLibrary = $__10.FnLibrary;
  var ObjectPath = $__12.ObjectPath;
  var VariableString = $__14.VariableString;
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
  var utils = {
    ObjectPath: ObjectPath,
    VariableString: VariableString
  };
  return {
    get createRoutes() {
      return createRoutes;
    },
    get createLibrary() {
      return createLibrary;
    },
    get createContext() {
      return createContext;
    },
    get utils() {
      return utils;
    },
    __esModule: true
  };
});
//# sourceURL=src/index.js