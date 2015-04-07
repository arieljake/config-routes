"use strict";
Object.defineProperties(exports, {
  RouteContext: {get: function() {
      return RouteContext;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteContext";
'use strict';
var _ = require('lodash');
var ObjectPath = require('../utils/ObjectPath').ObjectPath;
var VariableString = require('../utils/VariableString').VariableString;
var RouteContext = function RouteContext(state) {
  this.model = state || {};
  this.inheritedProps = [];
  this.excludedOnDumpProps = [];
};
var $RouteContext = RouteContext;
($traceurRuntime.createClass)(RouteContext, {
  get: function(name) {
    var path = new ObjectPath(name);
    return path.getValueIn(this.model);
  },
  set: function(name, value, inherited, excludedOnDump) {
    if (!name)
      return ;
    var path = new ObjectPath(name);
    path.setValueIn(this.model, value);
    if (inherited === true) {
      this.inheritedProps.push(name);
    }
    if (excludedOnDump === true) {
      this.excludedOnDumpProps.push(name);
    }
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
  child: function() {
    var $__0 = this;
    var child = new $RouteContext();
    this.inheritedProps.forEach((function(prop) {
      var value = $__0.get(prop);
      child.set(prop, value, true);
    }));
    return child;
  },
  toObject: function() {
    return _.omit(this.model, this.excludedOnDumpProps);
  }
}, {});
;
//# sourceURL=src/lib/RouteContext.js