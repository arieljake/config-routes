'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;

var RouteContext = require("../../dist-es5/lib/RouteContext").RouteContext;

describe("Route", function()
{
	it("empty constructor, initialized with empty state", function()
	{
		var routeContext = new RouteContext();

		assert.isObject(routeContext.model, "model is object");
		assert.equal(Object.keys(routeContext.model).length, 0, "empty state");
	});
	
	it("state in constructor, initialized with provided state", function()
	{
		var state = {
			foo: "bar"
		};
		var routeContext = new RouteContext(state);

		assert.deepEqual(routeContext.model, state, "state matches");
	});
	
	it("get returns value", function()
	{
		var state = {
			foo: {
				bar: 1
			}
		};
		var routeContext = new RouteContext(state);

		assert.equal(routeContext.get("foo.bar"), 1, "value matches");
	});
	
	it("set updates value", function()
	{
		var state = {
			foo: {
				bar: 1
			}
		};
		var routeContext = new RouteContext(state);

		assert.equal(routeContext.get("foo.bar"), 1, "old value matches");
		
		routeContext.set("foo.bar", 2);
		
		assert.equal(routeContext.get("foo.bar"), 2, "new value matches");
	});
	
	it("unset clears value", function()
	{
		var state = {
			foo: {
				bar: 1
			}
		};
		var routeContext = new RouteContext(state);

		assert.equal(routeContext.get("foo.bar"), 1, "old value matches");
		
		routeContext.unset("foo.bar");
		
		assert.isUndefined(routeContext.get("foo.bar"), "value undefined");
	});
	
	it("toObject with no excluded props matches state", function()
	{
		var state = {
			foo: "bar"
		};
		var routeContext = new RouteContext(state);

		assert.deepEqual(routeContext.toObject(), state, "toObject matches");
	});
	
	it("toObject omits excluded props", function()
	{
		var routeContext = new RouteContext();

		routeContext.set("foo", 1);
		routeContext.set("bar", 2, false, true);
		
		var contextObj = routeContext.toObject();
		
		assert.equal(contextObj.foo, 1, "included prop matches");
		assert.isUndefined(contextObj.bar, "ignored prop matches");
	});
	
	it("child context has empty state with no inherited props", function()
	{
		var routeContext = new RouteContext();

		routeContext.set("foo", 1);
		routeContext.set("bar", 2);
		
		var childContext = routeContext.child();
		
		assert.equal(Object.keys(childContext.model).length, 0, "empty state");
	});
	
	it("child context has inherited props", function()
	{
		var routeContext = new RouteContext();

		routeContext.set("foo", 1, true);
		routeContext.set("bar", 2);
		
		var childContext = routeContext.child();
		
		assert.equal(Object.keys(childContext.model).length, 1, "empty state");
		assert.equal(childContext.model.foo, 1, "value matches");
	});
	
	it("child context excludes same props on dump", function()
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
	
	it("child context has inherited props", function()
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
});