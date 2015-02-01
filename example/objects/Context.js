"use strict";
Object.defineProperties(exports, {
  Context: {get: function() {
      return Context;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist/objects/Context";
var ObjectPath = require('./ObjectPath').ObjectPath;
var Context = function Context(model, fnLib) {
  this.model = model;
  this.fnLib = fnLib;
};
($traceurRuntime.createClass)(Context, {
  get: function(name) {
    var path = new ObjectPath(name);
    return path.getValueIn(this.model);
  },
  set: function(name, value) {
    var path = new ObjectPath(name);
    path.setValueIn(this.model, value);
  },
  getFnByName: function(name) {
    return fnLib.get(name);
  }
}, {});
;
//# sourceURL=objects/Context.js