'use strict';

let Route = require('./Route').Route;
let RouteEventHandler = require('./RouteEventHandler').RouteEventHandler;

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

	get(name)
	{
		var routeDefinition = this.routeLib.get(name);

		if (!routeDefinition)
			routeDefinition = this.routeLib.get("404");
		
		var route = new Route(name, routeDefinition, this.fnLib);

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