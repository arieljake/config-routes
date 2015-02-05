'use strict';

let assert = require("chai").assert;

let FnTranslator = require('./FnTranslator').FnTranslator;

describe("FnTranslator", function()
{
	it("when translating with a variable string", function()
	{
		let translation = {
			varString: "#noun# is #adjective#"	
		};
		let translator = new FnTranslator();
		let output = translator._translate({
			noun: "coding",
			adjective: "fun"
		}, translation);

		assert.equal(output, "coding is fun", "output should be correct");
	});

});