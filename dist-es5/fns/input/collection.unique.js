"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.unique";
var _ = require("lodash");
var ObjectPath = require("../../utils/ObjectPath").ObjectPath;
function collectionUnique(state, config) {
  var collection = state.get(config.collectionVarName);
  var propPath;
  if (config.hasOwnProperty("propertyVarName"))
    propPath = new ObjectPath(config.propertyVarName);
  else
    propPath = null;
  var result = _.uniq(collection, function(item) {
    if (propPath)
      return propPath.getValueIn(item);
    else
      return item;
  });
  state.set(config.saveTo, result);
  return result;
}
var $__default = collectionUnique;
;
//# sourceURL=src/fns/input/collection.unique.js