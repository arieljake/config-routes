define("config-routes/utils/ObjectPathPart", ["lodash"], function($__0) {
  "use strict";
  var __moduleName = "config-routes/utils/ObjectPathPart";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var _ = $__0.default;
  var ObjectPathPart = function ObjectPathPart(part) {
    this.part = part;
  };
  ($traceurRuntime.createClass)(ObjectPathPart, {
    isArray: function() {
      return this.part.substr(-2) == "[]";
    },
    get arrayName() {
      return this.part.replace("[]", "");
    },
    get basename() {
      if (this.isArray())
        return this.arrayName;
      else
        return this.part;
    },
    getValueIn: function(obj) {
      return obj[this.basename];
    },
    createIn: function(obj) {
      var value;
      if (obj[this.basename] !== undefined) {
        value = obj[this.basename];
      } else if (this.isArray()) {
        value = obj[this.basename] = [];
      } else {
        value = obj[this.basename] = {};
      }
      return value;
    },
    setIn: function(obj, value) {
      if (this.isArray()) {
        this.createIn(obj);
        obj[this.basename] = obj[this.basename].concat(value);
      } else {
        obj[this.basename] = value;
      }
    }
  }, {});
  ;
  return {
    get ObjectPathPart() {
      return ObjectPathPart;
    },
    __esModule: true
  };
});
//# sourceURL=src/utils/ObjectPathPart.js