define("config-routes/lib/RouteContext", ["lodash", "../utils/ObjectPath", "../utils/VariableString"], function($__0,$__2,$__4) {
  "use strict";
  var __moduleName = "config-routes/lib/RouteContext";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  'use strict';
  var _ = $__0.default;
  var ObjectPath = $__2.ObjectPath;
  var VariableString = $__4.VariableString;
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
      var $__6 = this;
      var child = new $RouteContext();
      this.inheritedProps.forEach((function(prop) {
        var value = $__6.get(prop);
        var isExcludedOnDump = $__6.excludedOnDumpProps.indexOf(prop) >= 0;
        child.set(prop, value, true, isExcludedOnDump);
      }));
      return child;
    },
    toObject: function() {
      return _.omit(this.model, this.excludedOnDumpProps);
    }
  }, {});
  ;
  return {
    get RouteContext() {
      return RouteContext;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/RouteContext.js