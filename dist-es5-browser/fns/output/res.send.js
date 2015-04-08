define("config-routes/fns/output/res.send", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/output/res.send";
  function resSend(state, config) {
    var res = state.get(config.responseVarName);
    var value;
    if (config.value) {
      value = config.value;
    } else if (config.valueVarName) {
      value = state.get(config.valueVarName);
    }
    res.send(value);
  }
  var $__default = resSend;
  ;
  function humanize(utils, config) {
    var output;
    if (config.value) {
      output = utils.devariable("send #value#", config);
    } else if (config.valueVarName) {
      output = utils.devariable("send value at #valueVarName#", config);
    }
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
//# sourceURL=src/fns/output/res.send.js