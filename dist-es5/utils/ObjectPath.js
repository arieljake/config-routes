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
    if (!finalProperty || !object)
      return undefined;
    else
      return object[finalProperty];
  },
  setValueIn: function(obj, value) {
    var $__1 = this.descendIn(obj),
        finalProperty = $__1.finalProperty,
        object = $__1.object;
    if (finalProperty.substr(-2) == "[]") {
      finalProperty = finalProperty.replace("[]", "");
      if (object.hasOwnProperty(finalProperty) === false)
        object[finalProperty] = [];
      object[finalProperty].push(value);
    } else {
      object[finalProperty] = value;
    }
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
      object: objRef
    };
  }
}, {});
;
//# sourceURL=src/utils/ObjectPath.js