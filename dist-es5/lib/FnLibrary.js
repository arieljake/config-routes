"use strict";
Object.defineProperties(exports, {
  FnLibrary: {get: function() {
      return FnLibrary;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/FnLibrary";
var fs = require('fs');
var path = require('path');
var wrench = require('wrench');
var _ = require('lodash');
var Library = require('./Library').Library;
var FnLibrary = function FnLibrary(fnDirs) {
  this.lib = new Library(fnDirs);
};
($traceurRuntime.createClass)(FnLibrary, {
  get: function(id) {
    var fnEntry = this.lib.get(id);
    return fnEntry ? fnEntry.value.default : undefined;
  },
  toObject: function() {
    return this.lib.toObject();
  }
}, {});
//# sourceURL=src/lib/FnLibrary.js