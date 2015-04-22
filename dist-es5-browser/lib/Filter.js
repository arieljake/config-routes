define("config-routes/lib/Filter", ["lodash", "../utils/ObjectPath"], function($__0,$__2) {
  "use strict";
  var __moduleName = "config-routes/lib/Filter";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  'use strict';
  var _ = $__0.default;
  var ObjectPath = $__2.ObjectPath;
  var filterTypeEqualsTest = function(type) {
    return function(filterType) {
      return filterType == type;
    };
  };
  var Filter = {
    filter: function(value, config) {
      if (!config)
        return true;
      if (Array.isArray(config)) {
        var passes = true;
        for (var i = 0; i < config.length && passes === true; i++) {
          passes = Filter.filter(value, config[i]);
        }
        return passes;
      } else {
        var filterType;
        if (_.isString(config))
          filterType = config.toString();
        else
          filterType = config.type;
        var filter = _.find(Filter.filters, function(filter) {
          return filter.test(filterType) === true;
        });
        if (filter) {
          if (config.valueVarName) {
            var path = new ObjectPath(config.valueVarName);
            value = path.getValueIn(value);
          }
          return filter.filter(value, config, filterType);
        } else {
          return true;
        }
      }
    },
    filters: [{
      test: filterTypeEqualsTest("matches"),
      filter: function(value, config) {
        var regex = new RegExp(config.regex);
        return regex.test(value);
      }
    }]
  };
  return {
    get Filter() {
      return Filter;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/Filter.js