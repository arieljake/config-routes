define("config-routes/fns/routing/conditional.fn", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/routing/conditional.fn";
  var Q = require("q");
  function conditionalFn(state, config) {
    var routeLib = state.get("$routes");
    var value = state.get(config.valueVarName);
    if (config.invertValue === true)
      value = !value;
    if (value === true) {
      var fn = routeLib.getFn(config.fn);
      return fn(state, config.config);
    }
  }
  var $__default = conditionalFn;
  ;
  function humanize(utils, config) {
    var output = utils.devariable("conditional fn", config);
    return output;
  }
  ;
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
//# sourceURL=src/fns/routing/conditional.fn.js