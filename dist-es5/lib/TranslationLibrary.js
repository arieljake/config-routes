"use strict";
Object.defineProperties(exports, {
  TranslationLibrary: {get: function() {
      return TranslationLibrary;
    }},
  __esModule: {value: true}
});
var __moduleName = "dist-es5/lib/TranslationLibrary";
var Library = require('./Library').Library;
var TranslationLibrary = function TranslationLibrary(tranlationPaths) {
  this.lib = new Library(tranlationPaths, /\.json$/);
};
($traceurRuntime.createClass)(TranslationLibrary, {
  get: function(id) {
    var entry = this.lib.get(id);
    return entry ? entry.value : undefined;
  },
  toObject: function() {
    return this.lib.toObject();
  }
}, {});
//# sourceURL=src/lib/TranslationLibrary.js