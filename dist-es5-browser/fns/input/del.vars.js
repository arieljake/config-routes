define("config-routes/fns/input/del.vars", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/del.vars";
  var DelVar = require('./del.var');
  function delVars(state, config) {
    config.vars = config.vars || [];
    config.vars.forEach(function(varConfig) {
      DelVar.default(state, varConfig);
    });
  }
  var $__default = delVars;
  ;
  function humanize(utils, config) {
    var output = utils.devariable("delete multiple variables in state", config);
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
//# sourceURL=src/fns/input/del.vars.js