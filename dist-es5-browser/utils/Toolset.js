define("config-routes/utils/Toolset", ["lodash"], function($__0) {
  "use strict";
  var __moduleName = "config-routes/utils/Toolset";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var _ = $__0.default;
  var Toolset = function Toolset(toolFnName) {
    this.toolFnName = toolFnName || "exe";
    this.entries = [];
  };
  ($traceurRuntime.createClass)(Toolset, {
    createNameMatcher: function(name) {
      return function(key) {
        return key == name;
      };
    },
    add: function(matchFn, exeFn) {
      if (typeof matchFn === "string") {
        matchFn = this.createNameMatcher(matchFn);
      }
      var entry = {match: matchFn};
      entry[this.toolFnName] = exeFn;
      this.entries.push(entry);
    },
    clear: function() {
      this.entries.length = 0;
    },
    get: function(key) {
      return _.find(this.entries, function(entry) {
        return entry.match(key) === true;
      });
    }
  }, {});
  return {
    get Toolset() {
      return Toolset;
    },
    __esModule: true
  };
});
//# sourceURL=src/utils/Toolset.js