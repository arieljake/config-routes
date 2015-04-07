'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;

var RouteStep = require("../../dist-es5/lib/RouteStep").RouteStep;

describe("RouteStep", function()
{
	it("getExecutable binds context and config", function()
	{
		var stepId = "1";
		var fnId = "myFn";
		var desc = "myDesc";
		var stepConfig = {
			foo: "bars"
		};
		var stepFn = function(state, config)
		{
			state.foo = "bar";
			return config.foo;
		};
		var state = {};

		var step = new RouteStep(stepId, fnId, desc, stepFn, stepConfig);
		var boundFn = step.getExecutable(state);

		var result = boundFn();

		assert.equal(state.foo, "bar", "state bound");
		assert.equal(result, "bars", "config bound");
	});

	it("toObject returns id, name and desc", function()
	{
		var stepId = "1";
		var fnId = "myFn";
		var desc = "myDesc";
		var stepConfig = {
			foo: "bars"
		};
		var stepFn = function(state, config)
		{
			state.foo = "bar";
			return config.foo;
		};

		var step = new RouteStep(stepId, fnId, desc, stepFn, stepConfig);

		var stepObj = step.toObject();

		assert.equal(stepObj.id, stepId, "id matches");
		assert.equal(stepObj.name, fnId, "name matches");
		assert.equal(stepObj.desc, desc, "desc matches");
	});
});