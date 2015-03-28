"use strict";
Object.defineProperties(exports, {
  RouteLibrary: {get: function() {
      return RouteLibrary;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteLibrary";
'use strict';
var fs = require("fs");
var Library = require('./Library').Library;
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