'use strict';

let assert = require("chai").assert;

let RouteWriter = require('./RouteWriter').RouteWriter;

describe("RouteWriter", function()
{
	it("when writing a step with a stubbed translator", function()
	{
		let translator = {
			translate: function(definition)
			{
				return "step";
			}
		};
		let writer = new RouteWriter(translator);
		let output = writer.writeStep({});

		assert.equal(output, "step", "output should equal the stubbed response");
	});
	
	it("when writing a route with a stubbed translator", function()
	{
		let translator = {
			translate: function(definition)
			{
				return "step";
			}
		};
		let writer = new RouteWriter(translator);
		let stream = writer.write([{},{}]);
		let output = "";
		let chunk;
		
		while (chunk = stream.read())
		{
			output += chunk;
		}

		assert.equal(output, "stepstep", "output should equal the stubbed response");
	});

});