'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;
var Filter = require("../../dist-es5/lib/Filter").Filter;

describe("Filter", function()
{
	it("undefined config returns true", function()
	{
		var value = 10;
		var result = Filter.filter(value, undefined);
		
		assert.strictEqual(result, true, "result true");
	});
	
	it("unrecognized config responds true", function()
	{
		var value = "asdf";
		var result = Filter.filter(value, "asdf");
		
		assert.strictEqual(result, true, "result true");
	});
	
	it("matches regex responds true", function()
	{
		var value = "asdf";
		var result = Filter.filter(value, {type: "matches", regex: "asdf"});
		
		assert.strictEqual(result, true, "result true");
	});
	
	it("matches regex responds false", function()
	{
		var value = "asdf";
		var result = Filter.filter(value, {type: "matches", regex: "z"});
		
		assert.strictEqual(result, false, "result false");
	});
	
	it("valueVarName honored", function()
	{
		var value = {name: {last: "asdf"}};
		var result = Filter.filter(value, {valueVarName: "name.last", type: "matches", regex: "asdf"});
		
		assert.strictEqual(result, true, "result true");
	});
});