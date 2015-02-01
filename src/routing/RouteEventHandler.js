export class RouteEventHandler
{
	constructor(eventHandlers)
	{
		this.eventHandlers = eventHandlers;
	}

	handle(route)
	{
		route.once("routeStarting", (...args) =>
		{
			if (this.eventHandlers.starting)
			{
				this.eventHandlers.starting.apply(null, args);
			}
		});

		route.on("routeFnComplete", (...args) =>
		{
			if (this.eventHandlers.fnComplete)
			{
				this.eventHandlers.fnComplete.apply(null, args);
			}
		});

		route.once("routeComplete", (...args) =>
		{
			if (this.eventHandlers.complete)
			{
				this.eventHandlers.complete.apply(null, args);
			}
			
			route.removeAllListeners();
		});
	}
}