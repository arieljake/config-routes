"use strict";
Object.defineProperties(exports, {
  WriterUtils: {get: function() {
      return WriterUtils;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/WriterUtils";
'use strict';
var VariableString = require("../utils/VariableString").VariableString;
var WriterUtils = {devariable: function(varString, context) {
    return VariableString(varString, context);
  }};
//# sourceURL=src/lib/WriterUtils.js