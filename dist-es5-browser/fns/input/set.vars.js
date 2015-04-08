define("config-routes/fns/input/set.vars", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/set.vars";
  var SetVar = require('./set.var');
  function setVars(state, config) {
    config.vars = config.vars || [];
    config.vars.forEach(function(varConfig) {
      SetVar.default(state, varConfig);
    });
  }
  var $__default = setVars;
  ;
  function humanize(utils, config) {
    var output = "";
    config.vars.forEach(function(varConfig) {
      if (output.length > 0)
        output += "\n";
      output += SetVar.humanize(utils, varConfig);
    });
    return output;
  }
  return {
    get default() {
      return $__default;
    },
    get humanize() {
      return humanize;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/set.vars.js