"use strict";
var __moduleName = "dist-es5/lib/FnTranslator.test";
'use strict';
var assert = require("chai").assert;
var FnTranslator = require('./FnTranslator').FnTranslator;
describe("FnTranslator", function() {
  it("when translating with a variable string", function() {
    var translation = {varString: "#noun# is #adjective#"};
    var translator = new FnTranslator();
    var output = translator._translate({
      noun: "coding",
      adjective: "fun"
    }, translation);
    assert.equal(output, "coding is fun", "output should be correct");
  });
});
//# sourceURL=src/lib/FnTranslator.test.js