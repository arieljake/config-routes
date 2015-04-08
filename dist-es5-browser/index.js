define("config-routes/index", ["lodash", "./lib/RouteFactory", "./lib/FnLibrary", "./lib/RouteLibrary", "./lib/Library"], function($__0,$__2,$__4,$__6,$__8) {
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
  global.$traceurRuntime = require('traceur-runtime');
  var path = require("path");
  var _ = $__0.default;
  var RouteFactory = $__2.RouteFactory;
  var FnLibrary = $__4.FnLibrary;
  var RouteLibrary = $__6.RouteLibrary;
  var Library = $__8.Library;
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
  return {
    get createRoutes() {
      return createRoutes;
    },
    get createLibrary() {
      return createLibrary;
    },
    __esModule: true
  };
});
//# sourceURL=src/index.js