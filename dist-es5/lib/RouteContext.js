"use strict";
Object.defineProperties(exports, {
  RouteContext: {get: function() {
      return RouteContext;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteContext";
var ObjectPath = require('../utils/ObjectPath').ObjectPath;
var VariableString = require('../utils/VariableString').VariableString;
var RouteContext = function RouteContext(fnLib, state) {
  this.fnLib = fnLib;
  this.model = state || {};
};
($traceurRuntime.createClass)(RouteContext, {
  get: function(name) {
    var path = new ObjectPath(name);
    return path.getValueIn(this.model);
  },
  set: function(name, value) {
    if (!name)
      return ;
    var path = new ObjectPath(name);
    path.setValueIn(this.model, value);
  },
  unset: function(name) {
    if (!name)
      return ;
    var path = new ObjectPath(name);
    path.deleteIn(this.model);
  },
  translate: function(varString) {
    return VariableString(varString, this.model);
  },
  getFnByName: function(name) {
    return fnLib.get(name);
  },
  toObject: function() {
    return this.model;
  }
}, {});
;
//# sourceURL=src/lib/RouteContext.js