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
    var $__3 = this.descendIn(obj),
        finalProperty = $__3.finalProperty,
        object = $__3.object;
    delete object[finalProperty];
  },
  getValueIn: function(obj) {
    var $__3 = this.descendIn(obj),
        finalProperty = $__3.finalProperty,
        object = $__3.object;
    if (!finalProperty || !object)
      return undefined;
    else
      return object[finalProperty];
  },
  setValueIn: function(obj, value) {
    var $__3 = this.descendIn(obj),
        finalProperty = $__3.finalProperty,
        object = $__3.object;
    var finalPathPart = new ObjectPathPart(finalProperty);
    finalPathPart.setIn(object, value);
  },
  descendIn: function(obj) {
    if (!obj || !this.path)
      return {
        finalProperty: undefined,
        object: undefined
      };
    var objRef = obj;
    var pathParts = _.isArray(this.path) ? this.path : this.path.split(".");
    while (pathParts.length > 1) {
      var property = pathParts.shift();
      var pathPart = new ObjectPathPart(property);
      var childRef = pathPart.getValueIn(objRef);
      if (childRef === undefined) {
        if (_.isObject(objRef)) {
          childRef = pathPart.createIn(objRef);
        } else {
          return undefined;
        }
      }
      objRef = childRef;
    }
    return {
      finalProperty: pathParts.shift(),
      object: objRef
    };
  }
}, {});
;
//# sourceURL=src/utils/ObjectPath.js