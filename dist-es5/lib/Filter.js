"use strict";
Object.defineProperties(exports, {
  Filter: {get: function() {
      return Filter;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/Filter";
var $__lodash__,
    $__dist_45_es5_47_utils_47_Toolset__,
    $__dist_45_es5_47_utils_47_ObjectPath__;
'use strict';
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
var Toolset = ($__dist_45_es5_47_utils_47_Toolset__ = require("../utils/Toolset"), $__dist_45_es5_47_utils_47_Toolset__ && $__dist_45_es5_47_utils_47_Toolset__.__esModule && $__dist_45_es5_47_utils_47_Toolset__ || {default: $__dist_45_es5_47_utils_47_Toolset__}).Toolset;
var ObjectPath = ($__dist_45_es5_47_utils_47_ObjectPath__ = require("../utils/ObjectPath"), $__dist_45_es5_47_utils_47_ObjectPath__ && $__dist_45_es5_47_utils_47_ObjectPath__.__esModule && $__dist_45_es5_47_utils_47_ObjectPath__ || {default: $__dist_45_es5_47_utils_47_ObjectPath__}).ObjectPath;
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
//# sourceURL=src/lib/Filter.js