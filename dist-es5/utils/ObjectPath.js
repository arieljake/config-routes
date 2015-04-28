"use strict";
Object.defineProperties(exports, {
  ObjectPath: {get: function() {
      return ObjectPath;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/utils/ObjectPath";
var $__lodash__,
    $__dist_45_es5_47_utils_47_ObjectPathPart__;
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
var ObjectPathPart = ($__dist_45_es5_47_utils_47_ObjectPathPart__ = require("./ObjectPathPart"), $__dist_45_es5_47_utils_47_ObjectPathPart__ && $__dist_45_es5_47_utils_47_ObjectPathPart__.__esModule && $__dist_45_es5_47_utils_47_ObjectPathPart__ || {default: $__dist_45_es5_47_utils_47_ObjectPathPart__}).ObjectPathPart;
var ObjectPath = function ObjectPath(path) {
  this.path = path;
};
($traceurRuntime.createClass)(ObjectPath, {
  deleteIn: function(obj) {
    var result = this.descendIn(obj, false);
    if (result)
      delete result.object[result.finalProperty];
  },
  getValueIn: function(obj) {
    var result = this.descendIn(obj, false);
    if (result && result.finalProperty && result.object)
      return result.object[result.finalProperty];
    else
      return undefined;
  },
  setValueIn: function(obj, value) {
    var result = this.descendIn(obj, true);
    if (result) {
      var finalPathPart = new ObjectPathPart(result.finalProperty);
      finalPathPart.setIn(result.object, value);
    }
  },
  descendIn: function(obj, fillPath) {
    if (!obj || !this.path)
      return undefined;
    var objRef = obj;
    var pathParts = _.isArray(this.path) ? this.path : this.path.split(".");
    var partIndex = 0;
    while (partIndex < pathParts.length - 1) {
      var property = pathParts[partIndex++];
      var pathPart = new ObjectPathPart(property);
      var childRef = pathPart.getValueIn(objRef);
      if (childRef === undefined) {
        if (fillPath && _.isObject(objRef)) {
          childRef = pathPart.createIn(objRef);
        } else {
          return undefined;
        }
      }
      objRef = childRef;
    }
    return {
      finalProperty: pathParts[partIndex],
      object: objRef
    };
  }
}, {});
;
//# sourceURL=src/utils/ObjectPath.js