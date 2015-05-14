'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;
var Formatter = require("../../dist-es5/lib/Formatter").Formatter;

describe("Formatter", function()
{
	before(function()
	{
		Formatter.add("integer", function(value, config, formatType)
		{
			return parseInt(value, 10);
		});
		
		Formatter.add("string", function(value, config, formatType)
		{
			return value.toString();
		});
	});

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
		var newValue = Formatter.format(value,
		{
			type: "integer"
		});

		assert.strictEqual(newValue, 10, "format matches");
	});

	it("config array returns value formatted by sequence of formatters", function()
	{
		var value = "10";
		var newValue = Formatter.format(value, [
		{
			type: "integer"
		},
		{
			type: "string"
		}]);

		assert.strictEqual(newValue, value, "format matches");
	});
});