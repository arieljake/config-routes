"use strict";
Object.defineProperties(exports, {
  RouteContext: {get: function() {
      return RouteContext;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/RouteContext";
var $__lodash__,
    $__dist_45_es5_47_utils_47_ObjectPath__,
    $__dist_45_es5_47_utils_47_VariableString__;
'use strict';
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
var ObjectPath = ($__dist_45_es5_47_utils_47_ObjectPath__ = require("../utils/ObjectPath"), $__dist_45_es5_47_utils_47_ObjectPath__ && $__dist_45_es5_47_utils_47_ObjectPath__.__esModule && $__dist_45_es5_47_utils_47_ObjectPath__ || {default: $__dist_45_es5_47_utils_47_ObjectPath__}).ObjectPath;
var VariableString = ($__dist_45_es5_47_utils_47_VariableString__ = require("../utils/VariableString"), $__dist_45_es5_47_utils_47_VariableString__ && $__dist_45_es5_47_utils_47_VariableString__.__esModule && $__dist_45_es5_47_utils_47_VariableString__ || {default: $__dist_45_es5_47_utils_47_VariableString__}).VariableString;
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
    var $__3 = this;
    var child = new $RouteContext();
    this.inheritedProps.forEach((function(prop) {
      var value = $__3.get(prop);
      var isExcludedOnDump = $__3.excludedOnDumpProps.indexOf(prop) >= 0;
      child.set(prop, value, true, isExcludedOnDump);
    }));
    return child;
  },
  toObject: function() {
    return _.omit(this.model, this.excludedOnDumpProps);
  }
}, {});
;
//# sourceURL=src/lib/RouteContext.js