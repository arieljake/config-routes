'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;
var RouteContext = require("../../../dist-es5/lib/RouteContext").RouteContext;
var CollectionUnique = require("../../../dist-es5/fns/input/collection.unique").default;


describe("input/collection.unique", function()
{
	it("removes duplicates for simple array", function()
	{
		var state = new RouteContext();
		state.set("myCollection", ["1", "2", "1"]);

		var config = {
			collectionVarName: "myCollection"
		};

		var result = CollectionUnique(state, config);

		assert.equal(result.length, 2, "result length matches");
		assert.sameMembers(result, ["1", "2"], "result matches");
	});

	it("removes duplicates for array of objects", function()
	{
		var state = new RouteContext();
		state.set("myCollection", [
			{
				a: "1"
			},
			{
				a: "2"
			},
			{
				a: "1"
			}
		]);

		var config = {
			collectionVarName: "myCollection",
			propertyVarName: "a"
		};

		var result = CollectionUnique(state, config);

		assert.equal(result.length, 2, "result length matches");
		assert.sameDeepMembers(result, [
		{
			a: "1"
		},
		{
			a: "2"
		}], "result matches");
	});
});