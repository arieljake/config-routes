"use strict";
Object.defineProperties(exports, {
  ObjectPathPart: {get: function() {
      return ObjectPathPart;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/utils/ObjectPathPart";
var _ = require("lodash");
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
      obj[this.basename].push(value);
    } else {
      obj[this.basename] = value;
    }
  }
}, {});
;
//# sourceURL=src/utils/ObjectPathPart.js