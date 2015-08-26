"use strict";
Object.defineProperties(exports, {
  Library: {get: function() {
      return Library;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/Library";
var $__lodash__;
'use strict';
var fs = require('fs');
var path = require('path');
var wrench = require('wrench');
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
var Library = function Library(dirs, fileNameRegex) {
  this.defaultFileNameRegex = fileNameRegex || /\.js$/;
  this.entries = _.chain(_.flatten([dirs])).map(this.prepDir.bind(this)).map(this.loadDir.bind(this)).flatten().value();
};
($traceurRuntime.createClass)(Library, {
  prepDir: function(dir) {
    if (!dir)
      return [];
    var self = this;
    if (typeof dir === "string") {
      return {
        dirPath: dir,
        fileNameRegex: self.defaultFileNameRegex
      };
    } else {
      return {
        dirPath: dir.dirPath,
        fileNameRegex: dir.fileNameRegex || self.defaultFileNameRegex
      };
    }
  },
  loadDir: function(dir) {
    if (!dir)
      return [];
    var self = this;
    return wrench.readdirSyncRecursive(dir.dirPath).filter((function(fileName) {
      return dir.fileNameRegex.test(fileName);
    })).map((function(fileName) {
      var name = path.basename(fileName, path.extname(fileName));
      var id = path.join(path.dirname(fileName), name);
      var relativePath = fileName;
      var fullPath = path.join(dir.dirPath, fileName);
      return {
        id: id,
        name: name,
        relativePath: relativePath,
        fullPath: fullPath
      };
    }));
  },
  getById: function(value) {
    return this.entries.find((function(entry) {
      return entry.id == value;
    }));
  },
  getByName: function(value) {
    return this.entries.find((function(entry) {
      return entry.name == value;
    }));
  },
  getByPath: function(value) {
    return this.entries.find((function(entry) {
      return entry.relativePath == value;
    }));
  },
  toObject: function() {
    return {
      dirs: this.dirs,
      entries: this.entries
    };
  }
}, {});
//# sourceURL=src/lib/Library.js