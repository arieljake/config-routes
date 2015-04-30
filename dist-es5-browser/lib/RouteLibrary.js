define("config-routes/lib/RouteLibrary", ["./Library"], function($__0) {
  "use strict";
  var __moduleName = "config-routes/lib/RouteLibrary";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  'use strict';
  var fs = require("fs");
  var Library = $__0.Library;
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
    get entries() {
      return this.lib.entries;
    },
    toObject: function() {
      return this.lib.toObject();
    }
  }, {});
  return {
    get RouteLibrary() {
      return RouteLibrary;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/RouteLibrary.js