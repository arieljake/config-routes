"use strict";
Object.defineProperties(exports, {
  RouteLibrary: {get: function() {
      return RouteLibrary;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteLibrary";
var $__dist_45_es5_47_lib_47_Library__;
'use strict';
var fs = require("fs");
var Library = ($__dist_45_es5_47_lib_47_Library__ = require("./Library"), $__dist_45_es5_47_lib_47_Library__ && $__dist_45_es5_47_lib_47_Library__.__esModule && $__dist_45_es5_47_lib_47_Library__ || {default: $__dist_45_es5_47_lib_47_Library__}).Library;
var RouteLibrary = function RouteLibrary(routePaths) {
  this.lib = new Library(routePaths, /\.json$/);
};
($traceurRuntime.createClass)(RouteLibrary, {
  get: function(id) {
    var entry = this.lib.getById(id);
    if (!entry)
      return undefined;
    var route = JSON.parse(fs.readFileSync(entry.fullPath, "utf8"));
    return route;
  },
  toObject: function() {
    return this.lib.toObject();
  }
}, {});
//# sourceURL=src/lib/RouteLibrary.js