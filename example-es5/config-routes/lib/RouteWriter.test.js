"use strict";
var __moduleName = "dist-es5/lib/RouteWriter.test";
'use strict';
var assert = require("chai").assert;
var RouteWriter = require('./RouteWriter').RouteWriter;
describe("RouteWriter", function() {
  it("when writing a step with a stubbed translator", function() {
    var translator = {translate: function(definition) {
        return "step";
      }};
    var writer = new RouteWriter(translator);
    var output = writer.writeStep({});
    assert.equal(output, "step", "output should equal the stubbed response");
  });
  it("when writing a route with a stubbed translator", function() {
    var translator = {translate: function(definition) {
        return "step";
      }};
    var writer = new RouteWriter(translator);
    var stream = writer.write([{}, {}]);
    var output = "";
    var chunk;
    while (chunk = stream.read()) {
      output += chunk;
    }
    assert.equal(output, "stepstep", "output should equal the stubbed response");
  });
});
//# sourceURL=src/lib/RouteWriter.test.js