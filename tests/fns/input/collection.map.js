'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;
var RouteContext = require("../../../dist-es5/lib/RouteContext").RouteContext;
var CollectionMap = require("../../../dist-es5/fns/input/collection.map").default;


describe("input/collection.map", function()
{
	it("exits quietly when collection is undefined", function()
	{
		var state = new RouteContext();
		state.set("myCollection", undefined);

		var config = {
			collectionVarName: "myCollection",
			sourceKey: "myNum",
			destKey: "result",
			indexKey: "$index",
			saveTo: "results",
			map:
			{
				"vars": [
					{
						saveTo: "result",
						valueVarName: "$index"
					}
				]
			}
		};

		var returnResult = CollectionMap(state, config);

		var results = state.get("results");

		assert.equal(results.length, 0, "result matches");
		assert.deepEqual(results, returnResult, "return result matches");
	});
	
	it("makes index value available when indexKey specified", function()
	{
		var state = new RouteContext();
		state.set("myCollection", ["1", "2", "3"]);

		var config = {
			collectionVarName: "myCollection",
			sourceKey: "myNum",
			destKey: "result",
			indexKey: "$index",
			saveTo: "results",
			map:
			{
				"vars": [
					{
						saveTo: "result",
						valueVarName: "$index"
					}
				]
			}
		};

		var returnResult = CollectionMap(state, config);

		var results = state.get("results");

		assert.equal(results.length, 3, "result length matches");
		assert.sameMembers(results, [0, 1, 2], "result matches");
		assert.deepEqual(results, returnResult, "return result matches");
	});
});