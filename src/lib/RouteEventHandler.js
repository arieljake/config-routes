'use strict';

export class RouteEventHandler
{
	constructor(eventHandlers)
	{
		this.eventHandlers = eventHandlers || {};
	}

	handle(route)
	{
		route.once("routeStarting", (...args) =>
		{
			if (this.eventHandlers.routeStarting)
			{
				this.eventHandlers.routeStarting.apply(null, args);
			}
		});

		route.on("stepComplete", (...args) =>
		{
			if (this.eventHandlers.stepComplete)
			{
				this.eventHandlers.stepComplete.apply(null, args);
			}
		});

		route.on("stepError", (...args) =>
		{
			if (this.eventHandlers.stepError)
			{
				this.eventHandlers.stepError.apply(null, args);
			}
			
			route.removeAllListeners();
		});

		route.once("routeComplete", (...args) =>
		{
			if (this.eventHandlers.routeComplete)
			{
				this.eventHandlers.routeComplete.apply(null, args);
			}
			
			route.removeAllListeners();
		});
	}
}