"use strict";
Object.defineProperties(exports, {
  FnLibrary: {get: function() {
      return FnLibrary;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/FnLibrary";
var Library = require('./Library').Library;
var FnLibrary = function FnLibrary(fnPaths) {
  this.lib = new Library(fnPaths, /\.js$/);
};
($traceurRuntime.createClass)(FnLibrary, {
  get: function(id) {
    var entry = this.lib.get("id", id);
    if (!entry)
      return undefined;
    var fn = require(entry.fullPath);
    return fn.default;
  },
  getHumanizer: function(id) {
    var entry = this.lib.get("id", id);
    if (!entry)
      return undefined;
    var fn = require(entry.fullPath);
    return fn.humanize;
  },
  toObject: function() {
    return this.lib.toObject();
  }
}, {});
//# sourceURL=src/lib/FnLibrary.js