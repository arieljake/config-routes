"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  humanize: {get: function() {
      return humanize;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/routing/run.route";
function setVar(state, config) {
  var routeLib = state.get(config.routeLibVarName);
  var routeName = state.translate(config.routeNameString);
  var route = routeLib.get(routeName);
  var req = state.get("req");
  var res = state.get("res");
  return route.run(req, res);
}
var $__default = setVar;
;
function humanize(utils, config) {
  var output = utils.devariable("run route #routeName#", config);
  return output;
}
;
//# sourceURL=src/fns/routing/run.route.js