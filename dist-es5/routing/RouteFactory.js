"use strict";
Object.defineProperties(exports, {
  RouteFactory: {get: function() {
      return RouteFactory;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/routing/RouteFactory";
'use strict';
var fs = require("fs");
var path = require("path");
var wrench = require('wrench');
var Route = require('./Route').Route;
var RouteFactory = function RouteFactory(routeDir, fnLib) {
  this.routeDir = routeDir;
  this.fnLib = fnLib;
  this.routes = wrench.readdirSyncRecursive(routeDir).filter((function(fileName) {
    return path.extname(fileName) == ".json";
  })).map((function(fileName) {
    var name = path.basename(fileName);
    var defPath = path.join(routeDir, fileName);
    var definition = JSON.parse(fs.readFileSync(defPath, "utf8"));
    return {
      fileName: fileName,
      defPath: defPath,
      name: name,
      definition: definition
    };
  }));
};
($traceurRuntime.createClass)(RouteFactory, {get: function(name) {
    var $__0 = this;
    var routeObj = this.routes.find((function(route) {
      return route.fileName == name;
    }));
    if (routeObj) {
      return (function(req, res) {
        var route = new Route(routeObj.name, routeObj.definition, $__0.fnLib);
        route.run(req, res);
      });
    } else {
      return (function(req, res) {
        res.send(404);
      });
    }
  }}, {});
//# sourceURL=src/routing/RouteFactory.js