define("config-routes/fns/output/res.sendStatus", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/output/res.sendStatus";
  function resSendStatus(state, config) {
    var res = state.get(config.responseVarName);
    res.sendStatus(config.status);
  }
  var $__default = resSendStatus;
  ;
  function humanize(utils, config) {
    return "Send 404";
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
//# sourceURL=src/fns/output/res.sendStatus.js