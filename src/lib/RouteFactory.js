'use strict';

let uuid = require('uuid');

let Route = require('./Route').Route;
let RouteEventHandler = require('./RouteEventHandler').RouteEventHandler;
let RouteContext = require('./RouteContext').RouteContext;
let RouteStep = require('./RouteStep').RouteStep;

export class RouteFactory
{
	constructor(routeLib, fnLib, routeEvents)
	{
		this.routeLib = routeLib;
		this.fnLib = fnLib;
		this.routeEventHandler = new RouteEventHandler(routeEvents);
		this.routeInputs = [];
	}
	
	addRouteInput(name, value, isInherited, isIgnoredOnDump)
	{
		this.routeInputs.push({
			name: name,
			value: value,
			inherited: isInherited,
			ignored: isIgnoredOnDump
		});
	}

	get(name, context)
	{
		var routeDefinition = this.routeLib.get(name);

		if (!routeDefinition)
			return undefined;

		return this.create(name, routeDefinition, context);
	}

	create(name, routeDefinition, context)
	{
		if (!context)
		{
			context = new RouteContext();
			this.addInputsToContext(context);
		}
		
		var routeId = uuid.v1();
		var steps = this.createStepsForRoute(routeId, routeDefinition);		
		var route = new Route(routeId, name, steps, context);
		
		if (this.routeEventHandler)
			this.routeEventHandler.handle(route);

		return route;
	}
	
	createStepsForRoute(routeId, definition)
	{
		return definition.map((stepDef, index) =>
		{
			var stepId = routeId + "." + index;
			var fnId = stepDef.fn;
			var desc = stepDef.desc;
			var stepConfig = stepDef.config;
			var stepFn = this.fnLib.get(fnId);
			
			if (!stepFn)
				throw new Error("function not found: " + fnId);
			
			return new RouteStep(stepId, fnId, desc, stepFn, stepConfig);
		});
	}
	
	addInputsToContext(context)
	{
		this.routeInputs.forEach(function(input) {
			context.set(input.name, input.value, input.inherited, input.ignored);
		});
	}
}