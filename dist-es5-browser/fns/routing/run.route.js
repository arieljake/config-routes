define("config-routes/fns/routing/run.route", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/routing/run.route";
  var Q = require("q");
  function runRoute(state, config) {
    var routeLib = state.get("$routes");
    var routeContext = state.child();
    var route;
    if (!routeLib)
      return Q.reject("routeLib is undefined");
    if (config.routeNameString) {
      var routeName = state.translate(config.routeNameString);
      route = routeLib.get(routeName, routeContext);
    } else if (config.route) {
      route = routeLib.create(config.desc, config.route, routeContext);
    }
    if (config.input) {
      Object.keys(config.input).map(function(inputKey) {
        var fullKey = "input." + inputKey;
        var valueVarName = config.input[inputKey];
        var value;
        if (valueVarName.length >= 2 && valueVarName.substr(0, 1) == "'" && valueVarName.substr(-1) == "'") {
          value = valueVarName.substr(1, valueVarName.length - 2);
        } else {
          value = state.get(valueVarName);
        }
        route.context.set(fullKey, value);
      });
    }
    var routePromise = route.run();
    if (config.output) {
      routePromise = routePromise.then(function() {
        if (typeof config.output === "string") {
          var value = route.context.get("output");
          state.set(config.output, value);
        } else {
          Object.keys(config.output).map(function(outputKey) {
            var fullKey = "output." + outputKey;
            var saveTo = config.output[outputKey];
            var value = route.context.get(fullKey);
            state.set(saveTo, value);
          });
        }
      });
    }
    if (config.fork === true)
      return undefined;
    else
      return routePromise;
  }
  var $__default = runRoute;
  ;
  function humanize(utils, config) {
    var output = utils.devariable("run route #routeName#", config);
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
//# sourceURL=src/fns/routing/run.route.js