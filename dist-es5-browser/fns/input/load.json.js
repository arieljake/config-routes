define("config-routes/fns/input/load.json", ["fs"], function($__0) {
  "use strict";
  var __moduleName = "config-routes/fns/input/load.json";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var fs = $__0.default;
  function loadJson(state, config) {
    var path = state.get(config.pathAt);
    var content = fs.readFileSync(path, "utf8");
    var value = JSON.parse(content);
    state.set(config.saveTo, value);
  }
  var $__default = loadJson;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/load.json.js