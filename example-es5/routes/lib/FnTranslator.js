"use strict";
Object.defineProperties(exports, {
  FnTranslator: {get: function() {
      return FnTranslator;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/FnTranslator";
var _ = require("lodash");
var Library = require("./Library").Library;
var VariableString = require("../utils/VariableString").VariableString;
var FnTranslator = function FnTranslator(txDirs) {
  this.lib = new Library(txDirs);
};
($traceurRuntime.createClass)(FnTranslator, {
  translate: function(definition) {
    var tx = this.lib.get(id);
    return tx ? _translate(definition, tx) : undefined;
  },
  _translate: function(definition, translation) {
    if (translation.varString)
      return VariableString(translation.varString, definition);
    return "step";
  }
}, {});
//# sourceURL=src/lib/FnTranslator.js