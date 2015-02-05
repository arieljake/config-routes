"use strict";
Object.defineProperties(exports, {
  createRoutes: {get: function() {
      return createRoutes;
    }},
  createRouteWriter: {get: function() {
      return createRouteWriter;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/index";
global.$traceurRuntime = require('traceur-runtime');
var path = require("path");
var _ = require("lodash");
var RouteFactory = require('./lib/RouteFactory').RouteFactory;
var FnLibrary = require('./lib/FnLibrary').FnLibrary;
var FnTranslator = require('./lib/FnTranslator').FnTranslator;
var RouteWriter = require('./lib/RouteWriter').RouteWriter;
var TranslationLibrary = require('./lib/TranslationLibrary').TranslationLibrary;
function createRoutes(config) {
  var stdFnLibPath = path.join(__dirname, "fns");
  var fnPaths = _.flatten([stdFnLibPath, config.fnLib]);
  var fnLib = new FnLibrary(fnPaths);
  var routes = new RouteFactory(config.routeLib, fnLib, config.routeEvents);
  return routes;
}
;
function createRouteWriter(config) {
  var stdTranslationLibPath = path.join(__dirname, "translations");
  var translationPaths = _.flatten([stdTranslationLibPath, config.translationLib]);
  var translationLib = new TranslationLibrary(translationPaths, /\.json$/);
  var translator = new FnTranslator(translationLib);
  var writer = new RouteWriter(translator);
  return writer;
}
;
//# sourceURL=src/index.js