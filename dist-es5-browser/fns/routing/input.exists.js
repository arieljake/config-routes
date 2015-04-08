define("config-routes/fns/routing/input.exists", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/routing/input.exists";
  function inputExists(state, config) {
    var missingInputs = [];
    if (config.vars) {
      config.vars.forEach(function(varName) {
        var value = state.get(varName);
        if (value === undefined)
          missingInputs.push(varName);
      });
    }
    state.set(config.saveTo, missingInputs);
    if (config.throwOnError === true && missingInputs.length > 0) {
      return Q.reject({missingInputs: missingInputs});
    }
  }
  var $__default = inputExists;
  ;
  function humanize(utils, config) {
    var output = utils.devariable("validate input", config);
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
//# sourceURL=src/fns/routing/input.exists.js