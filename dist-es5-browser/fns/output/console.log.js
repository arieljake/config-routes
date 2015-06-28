define("config-routes/fns/output/console.log", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/output/console.log";
  function consoleLog(state, config) {
    var value;
    if (config.value) {
      value = config.value;
    } else if (config.valueString) {
      value = state.translate(config.valueString);
    }
    console.log(value);
  }
  var $__default = consoleLog;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/output/console.log.js