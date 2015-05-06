'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;

var RouteContext = require("../../dist-es5/lib/RouteContext").RouteContext;

describe("Route", function()
{
	describe("constructor", function()
	{
		it("initializes with empty state when no arguments provided", function()
		{
			var routeContext = new RouteContext();

			assert.isObject(routeContext.model, "model is object");
			assert.equal(Object.keys(routeContext.model).length, 0, "empty state");
		});

		it("initializes context with provided state", function()
		{
			var state = {
				foo: "bar"
			};
			var routeContext = new RouteContext(state);

			assert.deepEqual(routeContext.model, state, "state matches");
		});
	});

	it("get returns value", function()
	{
		var state = {
			foo:
			{
				bar: 1
			}
		};
		var routeContext = new RouteContext(state);

		assert.equal(routeContext.get("foo.bar"), 1, "value matches");
	});

	describe("set", function()
	{
		it("updates specifed path with provided value", function()
		{
			var state = {
				foo:
				{
					bar: 1
				}
			};
			var routeContext = new RouteContext(state);

			assert.equal(routeContext.get("foo.bar"), 1, "old value matches");

			routeContext.set("foo.bar", 2);

			assert.equal(routeContext.get("foo.bar"), 2, "new value matches");
		});
	});

	describe("unset", function()
	{
		it("clears value", function()
		{
			var state = {
				foo:
				{
					bar: 1
				}
			};
			var routeContext = new RouteContext(state);

			assert.equal(routeContext.get("foo.bar"), 1, "old value matches");

			routeContext.unset("foo.bar");

			assert.isUndefined(routeContext.get("foo.bar"), "value undefined");
		});
	});

	describe("toObject", function()
	{
		it("with no excluded props matches state", function()
		{
			var state = {
				foo: "bar"
			};
			var routeContext = new RouteContext(state);

			assert.deepEqual(routeContext.toObject(), state, "toObject matches");
		});

		it("omits excluded props", function()
		{
			var routeContext = new RouteContext();

			routeContext.set("foo", 1);
			routeContext.set("bar", 2, false, true);

			var contextObj = routeContext.toObject();

			assert.equal(contextObj.foo, 1, "included prop matches");
			assert.isUndefined(contextObj.bar, "ignored prop matches");
		});
	});

	describe("child", function()
	{
		it("creates child context with empty state when no props specified as inherited", function()
		{
			var routeContext = new RouteContext();

			routeContext.set("foo", 1);
			routeContext.set("bar", 2);

			var childContext = routeContext.child();

			assert.equal(Object.keys(childContext.model).length, 0, "empty state");
		});

		it("creates child context with specified inherited props", function()
		{
			var routeContext = new RouteContext();

			routeContext.set("foo", 1, true);
			routeContext.set("bar", 2);

			var childContext = routeContext.child();

			assert.equal(Object.keys(childContext.model).length, 1, "empty state");
			assert.equal(childContext.model.foo, 1, "value matches");
		});

		it("creates child context that dumps with same excluded properties", function()
		{
			var routeContext = new RouteContext();

			routeContext.set("foo", 1, true, false);
			routeContext.set("bar", 2, true, true);

			var childContext = routeContext.child();

			assert.equal(childContext.model.foo, 1, "value 1 inherited");
			assert.equal(childContext.model.bar, 2, "value 2 inherited");

			var childObj = childContext.toObject();

			assert.equal(childObj.foo, 1, "value 1 dumped");
			assert.isUndefined(childObj.bar, "value 2 excluded");

			assert.deepEqual(childObj, routeContext.toObject(), "dumps match");
		});
	});

	describe("assemble", function()
	{
		it("returns struct assembled from provided map", function()
		{
			var routeContext = new RouteContext();

			routeContext.set("foo", 1);
			routeContext.set("bar", 2);

			var input = {
				"prop1": "foo",
				"prop2": "bar"
			};

			var result = routeContext.assemble(input);

			assert.equal(result.prop1, routeContext.get(input.prop1), "prop1 matches");
			assert.equal(result.prop2, routeContext.get(input.prop2), "prop2 matches");
		});

		it("returns struct copied from provided key name", function()
		{
			var routeContext = new RouteContext();

			routeContext.set("inputSample",
			{
				"prop1": "foo",
				"prop2": "bar"
			});

			var result = routeContext.assemble("inputSample");

			assert.deepEqual(result, routeContext.get("inputSample"), "result matches");
		});
	});
});