define("config-routes/fns/input/del.var", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/del.var";
  function delVar(state, config) {
    var value;
    state.unset(config.valueVarName);
  }
  var $__default = delVar;
  ;
  function humanize(utils, config) {
    var output = utils.devariable("delete #valueVarName# in state", config);
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
//# sourceURL=src/fns/input/del.var.js