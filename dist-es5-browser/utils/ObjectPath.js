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
  return {
    get ObjectPath() {
      return ObjectPath;
    },
    __esModule: true
  };
});
//# sourceURL=src/utils/ObjectPath.js