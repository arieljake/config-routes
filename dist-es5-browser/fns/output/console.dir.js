define("config-routes/fns/output/console.dir", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/output/console.dir";
  function consoleDir(state, config) {
    var value;
    if (config.value) {
      value = config.value;
    } else if (config.valueVarName) {
      value = state.get(config.valueVarName);
    } else if (config.valueString) {
      value = state.tranlsate(config.valueString);
    }
    switch (config.format) {
      case "jsonString":
        value = JSON.stringify(value);
        break;
    }
    console.dir(value);
  }
  var $__default = consoleDir;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/output/console.dir.js