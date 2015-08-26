define("config-routes/lib/FnLibrary", ["./Library"], function($__0) {
  "use strict";
  var __moduleName = "config-routes/lib/FnLibrary";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  'use strict';
  var Library = $__0.Library;
  var FnLibrary = function FnLibrary(fnPaths, fileNameRegex) {
    this.lib = new Library(fnPaths, fileNameRegex || /\.js$/);
  };
  ($traceurRuntime.createClass)(FnLibrary, {
    get: function(id) {
      var entry = this.lib.getById(id);
      if (!entry)
        return undefined;
      var fn = require(entry.fullPath);
      if (fn.default)
        return fn.default;
      else
        return fn;
    },
    getHumanizer: function(id) {
      var entry = this.lib.getById(id);
      if (!entry)
        return undefined;
      var fn = require(entry.fullPath);
      return fn.humanize;
    },
    toObject: function() {
      return this.lib.toObject();
    }
  }, {});
  return {
    get FnLibrary() {
      return FnLibrary;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/FnLibrary.js