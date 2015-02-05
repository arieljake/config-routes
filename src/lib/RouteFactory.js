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
	}

	get(name)
	{
		var routeDefinition = this.routeLib.get(name);

		if (routeDefinition)
		{
			return (req, res) =>
			{
				var route = new Route(name, routeDefinition, this.fnLib);
				
				if (this.routeEventHandler)
					this.routeEventHandler.handle(route);
				
				route.run(req, res);
			};
		}
		else
		{
			return (req, res) =>
			{
				res.sendStatus(404);
			};
		}
	}
}