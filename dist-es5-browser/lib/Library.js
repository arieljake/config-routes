define("config-routes/lib/Library", ["lodash"], function($__0) {
  "use strict";
  var __moduleName = "config-routes/lib/Library";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  'use strict';
  var fs = require('fs');
  var path = require('path');
  var wrench = require('wrench');
  var _ = $__0.default;
  var Library = function Library(dirs, fileNameRegex) {
    this.dirs = _.flatten([dirs]);
    this.fileNameRegex = fileNameRegex || /\.js$/;
    this.entries = _.chain(this.dirs).map(_.bind(this.loadDir, this)).flatten().value();
  };
  ($traceurRuntime.createClass)(Library, {
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
    loadDir: function(dir) {
      var $__2 = this;
      if (!dir)
        return [];
      return wrench.readdirSyncRecursive(dir).filter((function(fileName) {
        return $__2.fileNameRegex.test(fileName);
      })).map((function(fileName) {
        var name = path.basename(fileName, path.extname(fileName));
        var id = path.join(path.dirname(fileName), name);
        var relativePath = fileName;
        var fullPath = path.join(dir, fileName);
        return {
          id: id,
          name: name,
          relativePath: relativePath,
          fullPath: fullPath
        };
      }));
    },
    toObject: function() {
      return {
        dirs: this.dirs,
        entries: this.entries
      };
    }
  }, {});
  return {
    get Library() {
      return Library;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/Library.js