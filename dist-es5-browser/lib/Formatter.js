define("config-routes/lib/Formatter", ["../utils/Toolset"], function($__0) {
  "use strict";
  var __moduleName = "config-routes/lib/Formatter";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  'use strict';
  var Toolset = $__0.Toolset;
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
  return {
    get Formatter() {
      return Formatter;
    },
    __esModule: true
  };
});
//# sourceURL=src/lib/Formatter.js