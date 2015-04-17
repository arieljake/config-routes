define("config-routes/utils/ObjectPath", ["lodash", "./ObjectPathPart"], function($__0,$__2) {
  "use strict";
  var __moduleName = "config-routes/utils/ObjectPath";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var _ = $__0.default;
  var ObjectPathPart = $__2.ObjectPathPart;
  var ObjectPath = function ObjectPath(path) {
    this.path = path;
  };
  ($traceurRuntime.createClass)(ObjectPath, {
    deleteIn: function(obj) {
      var $__5 = this.descendIn(obj),
          finalProperty = $__5.finalProperty,
          object = $__5.object;
      delete object[finalProperty];
    },
    getValueIn: function(obj) {
      var $__5 = this.descendIn(obj),
          finalProperty = $__5.finalProperty,
          object = $__5.object;
      if (!finalProperty || !object)
        return undefined;
      else
        return object[finalProperty];
    },
    setValueIn: function(obj, value) {
      var $__5 = this.descendIn(obj),
          finalProperty = $__5.finalProperty,
          object = $__5.object;
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
      var partIndex = 0;
      while (partIndex < pathParts.length - 1) {
        var property = pathParts[partIndex++];
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
        finalProperty: pathParts[partIndex],
        object: objRef
      };
    }
  }, {});
  ;
  return {
    get ObjectPath() {
      return ObjectPath;
    },
    __esModule: true
  };
});
//# sourceURL=src/utils/ObjectPath.js