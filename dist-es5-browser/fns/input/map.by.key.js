define("config-routes/fns/input/map.by.key", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/input/map.by.key";
  function mapByKey(state, config) {
    var source = state.get(config.arrayAt);
    var lookup = state.get(config.mapAt);
    var result = source.map((function(key) {
      return lookup[key];
    }));
    state.set(config.saveTo, result);
  }
  var $__default = mapByKey;
  ;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
//# sourceURL=src/fns/input/map.by.key.js