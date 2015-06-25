define("config-routes/lib/Filter", ["lodash", "../utils/Toolset", "../utils/ObjectPath"], function($__0,$__2,$__4) {
  "use strict";
  var __moduleName = "config-routes/lib/Filter";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  'use strict';
  var _ = $__0.default;
  var Toolset = $__2.Toolset;
  var ObjectPath = $__4.ObjectPath;
  var Filter = new Toolset("filter");
  Filter.filter = function(value, config, state) {
    if (!config)
      return true;
    if (Array.isArray(config)) {
      var passes = true;
      for (var i = 0; i < config.length && passes === true; i++) {
        passes = Filter.filter(value, config[i], state);
      }
      return passes;
    } else {
      var filterType;
      if (_.isString(config))
        filterType = config.toString();
      else
        filterType = config.type;
      var filter = this.get(filterType);
      if (filter) {
        if (config.valueVarName) {
          var path = new ObjectPath(config.valueVarName);
          value = path.getValueIn(value);
        }
        return filter.filter(value, config, state, filterType);
      } else {
        throw new Error("unfound filter type; " + filterType);
      }
    }
  };
  ;
  return {
    get Filter() {
      return Filter;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/Filter.js