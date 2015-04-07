'use strict';

global.$traceurRuntime = require('traceur-runtime');

var assert = require("chai").assert;

var Route = require("../../dist-es5/lib/Route").Route;
var RouteStep = require("../../dist-es5/lib/RouteStep").RouteStep;
var RouteContext = require("../../dist-es5/lib/RouteContext").RouteContext;

describe("Route", function()
{
	it("toObject returns id, name, and state", function()
	{
		var routeId = "1";
		var routeName = "myRoute";
		var routeSteps = [];
		var routeContext = new RouteContext();
		routeContext.set("foo", "bar");
		routeContext.set("_foo", "_bar");

		var route = new Route(routeId, routeName, routeSteps, routeContext);

		var routeObj = route.toObject();

		assert.equal(routeObj.id, routeId, "id matches");
		assert.equal(routeObj.name, routeName, "name matches");
		assert.deepEqual(routeObj.state,
		{
			foo: "bar",
			_foo: "_bar"
		}, "state matches");
	});

	it("starting and complete events fired", function(done)
	{
		var routeId = "1";
		var routeName = "myRoute";
		var routeSteps = [];
		var routeContext = new RouteContext();
		var route = new Route(routeId, routeName, routeSteps, routeContext);

		var startingEventReceived = false;
		var startingEventArg;

		route.on("routeStarting", function(routeObj)
		{
			startingEventReceived = true;
			startingEventArg = routeObj;
		});

		route.on("routeComplete", function(routeObj)
		{
			try
			{
				assert(startingEventReceived, "starting event received");
				assert.deepEqual(startingEventArg, route.toObject(), "starting event arg matches");
				assert.deepEqual(routeObj, route.toObject(), "complete event arg matches");

				done();
			}
			catch (err)
			{
				done(err);
			}
		});

		route.run();
	});

	it("stepComplete event fires", function(done)
	{
		var value;
		var step1 = new RouteStep("step1", "fn1", "desc1", function(state, config)
		{
			value = 1;
			return true;
		});

		var routeId = "1";
		var routeName = "myRoute";
		var routeSteps = [
			step1
		];
		var routeContext = new RouteContext();
		var route = new Route(routeId, routeName, routeSteps, routeContext);

		route.on("stepComplete", function(stepObj, routeObj)
		{
			try
			{
				assert.equal(value, 1, "step ran");
				assert.deepEqual(stepObj, step1.toObject(), "step obj matches");
				assert.deepEqual(routeObj, route.toObject(), "route obj matches");
				
				done();
			}
			catch (err)
			{
				done(err);
			}
		});

		route.run();
	});

	it("stepError event fires", function(done)
	{
		var value;
		var step1 = new RouteStep("step1", "fn1", "desc1", function(state, config)
		{
			value = 1;
			throw new Error("step error");
		});

		var routeId = "1";
		var routeName = "myRoute";
		var routeSteps = [
			step1
		];
		var routeContext = new RouteContext();
		var route = new Route(routeId, routeName, routeSteps, routeContext);

		route.on("stepError", function(error, stepObj, routeObj)
		{
			try
			{
				assert.equal(value, 1, "step ran");
				assert.equal(error, "step error", "error matches");
				assert.deepEqual(stepObj, step1.toObject(), "step obj matches");
				assert.deepEqual(routeObj, route.toObject(), "route obj matches");
				
				done();
			}
			catch (err)
			{
				done(err);
			}
		});

		route.run();
	});

	it("promise is resolved with no steps", function(done)
	{
		var routeId = "1";
		var routeName = "myRoute";
		var routeSteps = [];
		var routeContext = new RouteContext();
		var route = new Route(routeId, routeName, routeSteps, routeContext);

		var startingEventReceived = false;

		route.run()
			.then(function()
			{
				done();
			});
	});

	it("promise is resolved with step", function(done)
	{
		var value;
		var step1 = new RouteStep("step1", "fn1", "desc1", function(state, config)
		{
			value = 1;
			return true;
		});

		var routeId = "1";
		var routeName = "myRoute";
		var routeSteps = [
			step1
		];
		var routeContext = new RouteContext();
		var route = new Route(routeId, routeName, routeSteps, routeContext);

		var startingEventReceived = false;

		route.run()
			.then(function()
			{
				try
				{
					assert.equal(value, 1, "step ran");

					done();
				}
				catch (err)
				{
					done(err);
				}
			});
	});

	it("promise is rejected with step error", function(done)
	{
		var value;
		var step1 = new RouteStep("step1", "fn1", "desc1", function(state, config)
		{
			throw new Error("step error");
		});

		var routeId = "1";
		var routeName = "myRoute";
		var routeSteps = [
			step1
		];
		var routeContext = new RouteContext();
		var route = new Route(routeId, routeName, routeSteps, routeContext);

		var startingEventReceived = false;

		route.run()
			.catch(function(err)
			{
				try
				{
					assert(err.step, "step returned");
					assert(err.error, "error returned");
					assert(err.route, "route returned");
					assert.equal(err.error.error, "step error", "error matches");
					
					done();
				}
				catch (err)
				{
					done(err);
				}
			});
	});
});