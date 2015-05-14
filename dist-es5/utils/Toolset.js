"use strict";
Object.defineProperties(exports, {
  Toolset: {get: function() {
      return Toolset;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/utils/Toolset";
var $__lodash__;
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
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
//# sourceURL=src/utils/Toolset.js