'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;
var Formatter = require("../../dist-es5/lib/Formatter").Formatter;

describe("Formatter", function()
{
	it("undefined config returns value", function()
	{
		var value = 10;
		var newValue = Formatter.format(value, undefined);
		
		assert.strictEqual(value, newValue, "values match");
	});
	
	it("config string returns formatted value", function()
	{
		var value = "10";
		var newValue = Formatter.format(value, "integer");
		
		assert.strictEqual(newValue, 10, "format matches");
	});
	
	it("config object returns formatted value", function()
	{
		var value = "10";
		var newValue = Formatter.format(value, {type: "integer"});
		
		assert.strictEqual(newValue, 10, "format matches");
	});
	
	it("config array with single entry returns formatted value", function()
	{
		var value = "10";
		var newValue = Formatter.format(value, [{type: "integer"},{type: "string"}]);
		
		assert.strictEqual(newValue, value, "format matches");
	});
	
	it("returns uuid v1 by default", function()
	{
		var value = "10";
		var newValue = Formatter.format(value, [{type: "uuid"}]);
		
		assert.match(newValue, /[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/, "value id is uuid.v1");
	});
	
	it("returns uuid v1 if requested", function()
	{
		var value = "10";
		var newValue = Formatter.format(value, [{type: "uuid.v1"}]);
		
		assert.match(newValue, /[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/, "value id is uuid.v1");
	});
	
	it("returns uuid v4 if requested", function()
	{
		var value = "10";
		var newValue = Formatter.format(value, [{type: "uuid.v4"}]);
		
		assert.match(newValue, /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/, "value id is uuid.v4");
	});
});