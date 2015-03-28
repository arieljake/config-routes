"use strict";
Object.defineProperties(exports, {
  StepWriter: {get: function() {
      return StepWriter;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/StepWriter";
'use strict';
var _ = require("lodash");
var WriterUtils = require("./WriterUtils").WriterUtils;
var StepWriter = function StepWriter(fnLib) {
  this.fnLib = fnLib;
};
($traceurRuntime.createClass)(StepWriter, {write: function(stepDefinition) {
    var fnHumanizer = this.fnLib.getHumanizer(stepDefinition.fn);
    return fnHumanizer ? fnHumanizer(WriterUtils, stepDefinition.config) : undefined;
  }}, {});
//# sourceURL=src/lib/StepWriter.js