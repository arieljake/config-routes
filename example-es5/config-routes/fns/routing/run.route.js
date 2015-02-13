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
  if (config.input) {
    Object.keys(config.input).map(function(inputKey) {
      var fullKey = "input." + inputKey;
      var valueVarName = config.input[inputKey];
      var value = state.get(valueVarName);
      route.context.set(fullKey, value);
    });
  }
  var routePromise = route.run(req, res);
  if (config.output) {
    routePromise = routePromise.then(function() {
      Object.keys(config.output).map(function(outputKey) {
        var fullKey = "output." + outputKey;
        var saveTo = config.output[outputKey];
        var value = route.context.get(fullKey);
        state.set(saveTo, value);
      });
    });
  }
  if (config.fork === true)
    return undefined;
  else
    return routePromise;
}
var $__default = setVar;
;
function humanize(utils, config) {
  var output = utils.devariable("run route #routeName#", config);
  return output;
}
;
//# sourceURL=src/fns/routing/run.route.js