"use strict";
Object.defineProperties(exports, {
  Formatter: {get: function() {
      return Formatter;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/Formatter";
var $__dist_45_es5_47_utils_47_Toolset__;
'use strict';
var Toolset = ($__dist_45_es5_47_utils_47_Toolset__ = require("../utils/Toolset"), $__dist_45_es5_47_utils_47_Toolset__ && $__dist_45_es5_47_utils_47_Toolset__.__esModule && $__dist_45_es5_47_utils_47_Toolset__ || {default: $__dist_45_es5_47_utils_47_Toolset__}).Toolset;
var Formatter = new Toolset("format");
Formatter.format = function(value, config) {
  if (!config)
    return value;
  if (Array.isArray(config)) {
    config.forEach(function(formatStep) {
      value = Formatter.format(value, formatStep);
    });
    return value;
  } else {
    var formatType;
    if (typeof config === "string")
      formatType = config.toString();
    else
      formatType = config.type;
    var formatter = this.get(formatType);
    if (formatter) {
      value = formatter.format(value, config, formatType);
    }
    return value;
  }
};
;
//# sourceURL=src/lib/Formatter.js