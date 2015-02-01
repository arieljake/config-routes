"use strict";
Object.defineProperties(exports, {
  ObjectPath: {get: function() {
      return ObjectPath;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/utils/ObjectPath";
var _ = require("lodash");
var ObjectPath = function ObjectPath(path) {
  this.path = path;
};
($traceurRuntime.createClass)(ObjectPath, {
  deleteIn: function(obj) {
    var $__1 = this.descendIn(obj),
        finalProperty = $__1.finalProperty,
        object = $__1.object;
    delete object[finalProperty];
  },
  getValueIn: function(obj) {
    var $__1 = this.descendIn(obj),
        finalProperty = $__1.finalProperty,
        object = $__1.object;
    return object[finalProperty];
  },
  setValueIn: function(obj, value) {
    var $__1 = this.descendIn(obj),
        finalProperty = $__1.finalProperty,
        object = $__1.object;
    object[finalProperty] = value;
  },
  descendIn: function(obj) {
    if (!obj || !this.path)
      return undefined;
    var objRef = obj;
    var pathParts = this.path.split(".");
    while (pathParts.length > 1) {
      var property = pathParts.shift();
      var childRef = objRef[property];
      if (childRef === undefined) {
        if (_.isObject(objRef))
          childRef = objRef[property] = {};
        else
          return undefined;
      }
      objRef = childRef;
    }
    return {
      finalProperty: pathParts.shift(),
      object: obj
    };
  }
}, {});
;
//# sourceURL=src/utils/ObjectPath.js