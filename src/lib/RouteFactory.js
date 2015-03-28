'use strict';

let Route = require('./Route').Route;
let RouteEventHandler = require('./RouteEventHandler').RouteEventHandler;
let RouteContext = require('./RouteContext').RouteContext;

export class RouteFactory
{
	constructor(routeLib, fnLib, routeEvents)
	{
		this.routeLib = routeLib;
		this.fnLib = fnLib;
		this.routeEventHandler = new RouteEventHandler(routeEvents);
		this.routeInputs = {};
	}
	
	addRouteInput(name, value)
	{
		this.routeInputs[name] = value;
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
		}

		var route = new Route(name, routeDefinition, this.fnLib, context);

		this.addInputsToRoute(route);
		
		if (this.routeEventHandler)
			this.routeEventHandler.handle(route);

		return route;
	}
	
	addInputsToRoute(route)
	{
		Object.keys(this.routeInputs).map((inputKey) => 
		{
			var value = this.routeInputs[inputKey];

			route.context.set(inputKey, value);
		});
	}
}