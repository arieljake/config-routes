define("config-routes/fns/routing/branch.route", [], function() {
  "use strict";
  var __moduleName = "config-routes/fns/routing/branch.route";
  var _ = require('lodash');
  var runRoute = require("./run.route").default;
  function branchRoute(state, config) {
    var value = state.get(config.valueVarName);
    var cases = config.cases;
    var defaultCase = config.defaultCase;
    var targetCase = _.find(cases, function(curCase) {
      return curCase.value == value;
    });
    if (!targetCase) {
      targetCase = defaultCase;
    }
    if (targetCase) {
      var buildOutput = function(branchOutput, caseOutput) {
        if (typeof branchOutput === "string" || typeof caseOutput === "string") {
          if (caseOutput)
            return caseOutput;
          else
            return branchOutput;
        } else if (branchOutput || caseOutput) {
          return _.defaults({}, caseOutput, branchOutput);
        } else {
          return undefined;
        }
      };
      var routeConfig = {
        route: targetCase.route,
        routeName: targetCase.routeName,
        desc: targetCase.desc,
        input: _.defaults({}, targetCase.input, config.input),
        inputs: _.defaults({}, targetCase.inputs, config.inputs),
        outputs: buildOutput(config.outputs, targetCase.outputs)
      };
      return runRoute(state, routeConfig);
    }
  }
  var $__default = branchRoute;
  ;
  function humanize(utils, config) {
    var output = utils.devariable("branch route", config);
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
//# sourceURL=src/fns/routing/branch.route.js