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
var __moduleName = "dist-es5/fns/routing/branch.route";
var _ = require('lodash');
var runRoute = require("./run.route").default;
function branchRoute(state, config) {
  var value = state.get(config.valueVarName);
  var format = config.format;
  var cases = config.cases;
  var defaultCase = config.defaultCase;
  var targetCase = _.find(cases, function(curCase) {
    return curCase.value == value;
  });
  if (!targetCase) {
    targetCase = defaultCase;
  }
  if (targetCase) {
    var routeConfig = {
      routeLibVarName: config.routeLibVarName,
      route: targetCase.route,
      desc: targetCase.desc,
      input: _.defaults({}, targetCase.input, config.input)
    };
    return runRoute(state, routeConfig);
  } else {
    throw new Error("no valid switch");
  }
}
var $__default = branchRoute;
;
function humanize(utils, config) {
  var output = utils.devariable("branch route", config);
  return output;
}
;
//# sourceURL=src/fns/routing/branch.route.js