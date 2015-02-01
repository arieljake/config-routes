"use strict";
Object.defineProperties(exports, {
  createRoutes: {get: function() {
      return createRoutes;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/index";
global.$traceurRuntime = require('traceur-runtime');
var path = require("path");
var _ = require("lodash");
var RouteFactory = require('./lib/RouteFactory').RouteFactory;
var FnLibrary = require('./lib/FnLibrary').FnLibrary;
function createRoutes(config) {
  var stdFnLibPath = path.join(__dirname, "fns");
  var fnPaths = _.flatten([stdFnLibPath, config.fnLib]);
  var fnLib = new FnLibrary(fnPaths);
  var routes = new RouteFactory(config.routeLib, fnLib, config.routeEvents);
  return routes;
}
;
//# sourceURL=src/index.js