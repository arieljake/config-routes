"use strict";
Object.defineProperties(exports, {
  FnLibrary: {get: function() {
      return FnLibrary;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/FnLibrary";
var $__dist_45_es5_47_lib_47_Library__;
'use strict';
var Library = ($__dist_45_es5_47_lib_47_Library__ = require("./Library"), $__dist_45_es5_47_lib_47_Library__ && $__dist_45_es5_47_lib_47_Library__.__esModule && $__dist_45_es5_47_lib_47_Library__ || {default: $__dist_45_es5_47_lib_47_Library__}).Library;
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
//# sourceURL=src/lib/FnLibrary.js