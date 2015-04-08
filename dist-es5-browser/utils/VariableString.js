define("config-routes/utils/VariableString", ["lodash", "./ObjectPath"], function($__0,$__2) {
  "use strict";
  var __moduleName = "config-routes/utils/VariableString";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var _ = $__0.default;
  var ObjectPath = $__2.ObjectPath;
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
  return {
    get VariableString() {
      return VariableString;
    },
    __esModule: true
  };
});
//# sourceURL=src/utils/VariableString.js