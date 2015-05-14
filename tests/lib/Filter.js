'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;
var Filter = require("../../dist-es5/lib/Filter").Filter;
var ConfigRoutes = require("../../dist-es5/index");
var Filter = ConfigRoutes.Filter;

describe("Filter", function()
{
	before(function()
	{
		Filter.add("true", function(value)
		{
			return true;
		});

		Filter.add("false", function(value)
		{
			return false;
		});

		Filter.add("isA", function(value, config, state, filterType)
		{
			return value == "a";
		});
	});

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

	it("filter by config string", function()
	{
		var value1 = "a";
		var result1 = Filter.filter(value1, "isA");

		assert.strictEqual(result1, true, "result true");

		var value2 = "b";
		var result2 = Filter.filter(value2, "isA");

		assert.strictEqual(result2, false, "result false");
	});

	it("filter by config object", function()
	{
		var value1 = "a";
		var result1 = Filter.filter(value1,
		{
			type: "isA"
		});

		assert.strictEqual(result1, true, "result true");

		var value2 = "b";
		var result2 = Filter.filter(value2,
		{
			type: "isA"
		});

		assert.strictEqual(result2, false, "result false");
	});

	it("valueVarName honored", function()
	{
		var value = {
			foo:
			{
				bar: "a"
			}
		};
		var config = {
			type: "isA",
			valueVarName: "foo.bar"
		};
		var result = Filter.filter(value, config);

		assert.strictEqual(result, true, "result true");
	});

	it("filter array returns AND of all filters", function()
	{
		var result;

		result = Filter.filter(1, ["true"]);

		assert.strictEqual(result, true, "result single item array matches");

		result = Filter.filter(2, ["false"]);

		assert.strictEqual(result, false, "result single item array matches");

		result = Filter.filter(3, ["true", "true"]);

		assert.strictEqual(result, true, "result multi item array matches");

		result = Filter.filter(4, ["true", "false"]);

		assert.strictEqual(result, false, "result multi item array matches");

		result = Filter.filter(5, ["false", "true"]);

		assert.strictEqual(result, false, "result multi item array matches");
	});
});