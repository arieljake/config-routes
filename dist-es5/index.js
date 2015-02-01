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
function createRoutes(routeLib, fnLibs) {
  var stdFnLib = path.join(__dirname, "fnLib");
  fnLibs = _.flatten([stdFnLib, fnLibs]);
  var fnLib = new FnLibrary(fnLibs);
  var routes = new RouteFactory(routeLib, fnLib);
  return routes;
}
;
//# sourceURL=src/index.js