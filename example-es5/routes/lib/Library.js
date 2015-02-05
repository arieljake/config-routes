"use strict";
Object.defineProperties(exports, {
  Library: {get: function() {
      return Library;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/Library";
var fs = require('fs');
var path = require('path');
var wrench = require('wrench');
var _ = require("lodash");
var Library = function Library(dirs, fileNameRegex) {
  this.dirs = _.flatten([dirs]);
  this.fileNameRegex = fileNameRegex || /\.js$/;
  this.entries = _.chain(this.dirs).map(this.loadDir).flatten().value();
};
($traceurRuntime.createClass)(Library, {
  get: function(id) {
    return this.entries.find((function(entry) {
      return entry.id == id;
    }));
  },
  loadDir: function(dir) {
    var $__0 = this;
    if (!dir)
      return [];
    return wrench.readdirSyncRecursive(dir).filter((function(fileName) {
      return $__0.fileNameRegex.test(fileName);
    })).map((function(fileName) {
      var name = path.basename(fileName, '.js');
      var id = path.join(path.dirname(fileName), name);
      var relativePath = fileName;
      var fullPath = path.join(dir, fileName);
      var value = require(fullPath);
      return {
        id: id,
        name: name,
        relativePath: relativePath,
        fullPath: fullPath,
        value: value
      };
    }));
  },
  toObject: function() {
    return {dirs: this.dirs};
  }
}, {});
//# sourceURL=src/lib/Library.js