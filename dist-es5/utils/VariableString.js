"use strict";
Object.defineProperties(exports, {
  VariableString: {get: function() {
      return VariableString;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/utils/VariableString";
var $__lodash__,
    $__dist_45_es5_47_utils_47_ObjectPath__;
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
var ObjectPath = ($__dist_45_es5_47_utils_47_ObjectPath__ = require("./ObjectPath"), $__dist_45_es5_47_utils_47_ObjectPath__ && $__dist_45_es5_47_utils_47_ObjectPath__.__esModule && $__dist_45_es5_47_utils_47_ObjectPath__ || {default: $__dist_45_es5_47_utils_47_ObjectPath__}).ObjectPath;
function VariableString(value, context, delim) {
  if (_.isString(value) === false)
    return value;
  delim = delim || "#";
  var varLocator = new RegExp("\\" + delim + "[\\w\\.\\-\\d]+" + "\\" + delim, "g");
  var varExtract = new RegExp("\\" + delim, "g");
  if (!context)
    return _.map(value.match(varLocator), function(varName) {
      return varName.replace(/\#/g, "");
    });
  return value.replace(varLocator, function(m, i, t) {
    var path = m.replace(varExtract, "");
    if (_.isFunction(context.get)) {
      return context.get(path);
    } else {
      return new ObjectPath(path).getValueIn(context).toString();
    }
  });
}
//# sourceURL=src/utils/VariableString.js