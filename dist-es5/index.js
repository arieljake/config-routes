"use strict";
Object.defineProperties(exports, {
  createRoutes: {get: function() {
      return createRoutes;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/index";
var path = require("path");
var _ = require("lodash");
var RouteFactory = require('./routing/RouteFactory').RouteFactory;
var FnLibrary = require('./routing/FnLibrary').FnLibrary;
function createRoutes(config) {
  var stdFnLibPath = path.join(__dirname, "fnLib");
  var fnPaths = _.flatten([stdFnLibPath, config.fnLib]);
  var fnLib = new FnLibrary(fnPaths);
  var routes = new RouteFactory(config.routeLib, fnLib);
  return routes;
}
;
//# sourceURL=src/index.js