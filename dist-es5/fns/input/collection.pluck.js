"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/fns/input/collection.pluck";
var _ = require("lodash");
var ObjectPath = require("../../utils/ObjectPath").ObjectPath;
var Formatter = require("../../lib/Formatter").Formatter;
function pluck(state, config) {
  var collection = state.get(config.collectionVarName);
  var path = new ObjectPath(config.propertyName);
  var format = config.format;
  var value = _.map(collection, function(item) {
    var itemValue = path.getValueIn(item);
    itemValue = Formatter.format(itemValue, format);
    return itemValue;
  });
  state.set(config.saveTo, value);
  if (config.deleteOriginal === true) {
    state.unset(config.collectionVarName);
  }
}
var $__default = pluck;
;
//# sourceURL=src/fns/input/collection.pluck.js