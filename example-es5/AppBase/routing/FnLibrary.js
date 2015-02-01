"use strict";
Object.defineProperties(exports, {
  FnLibrary: {get: function() {
      return FnLibrary;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/routing/FnLibrary";
var fs = require('fs');
var path = require('path');
var wrench = require('wrench');
var _ = require("lodash");
var FnLibrary = function FnLibrary(fnDirs) {
  this.fnDirs = _.flatten([fnDirs]);
  this.fns = _.flatten(fnDirs, this._loadFunctionsInDir);
};
($traceurRuntime.createClass)(FnLibrary, {
  get: function(name) {
    var fnDef = this.fns.find((function(fn) {
      return fn.id == name;
    }));
    return fnDef ? fnDef.fn : undefined;
  },
  _loadFunctionsInDir: function(dir) {
    return wrench.readdirSyncRecursive(dir).filter((function(fileName) {
      return path.extname(fileName) == '.js';
    })).map((function(fileName) {
      var name = path.basename(fileName, '.js');
      var id = path.join(path.dirname(fileName), name);
      var fnPath = path.join(dir, fileName);
      var fn = require(fnPath).default;
      return {
        fileName: fileName,
        fnPath: fnPath,
        name: name,
        id: id,
        fn: fn
      };
    }));
  }
}, {});
//# sourceURL=src/routing/FnLibrary.js