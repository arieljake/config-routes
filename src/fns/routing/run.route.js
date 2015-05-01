let Q = require("q");

export
default
function runRoute(state, config)
{
	var routeLib = state.get("$routes");
	var routeContext = state.child();
	var route;

	if (!routeLib)
		return Q.reject("routeLib is undefined");

	if (config.routeName)
	{
		route = routeLib.get(config.routeName, routeContext);
	}
	else if (config.route)
	{
		route = routeLib.create(config.desc, config.route, routeContext);
	}

	if (config.input)
	{
		var input = state.assemble(config.input);
		routeContext.set("input", input);
	}

	var routePromise = route.run();

	if (config.output)
	{
		routePromise = routePromise.then(function()
		{
			var output = route.context.get("output");
			
			if (typeof config.output === "string")
			{
				state.set(config.output, output);
			}
			else
			{
				Object.keys(config.output).map(function(outputKey)
				{
					var value = output[outputKey];
					var saveTo = config.output[outputKey];

					state.set(saveTo, value);
				});
			}
		});
	}

	if (config.fork === true)
		return undefined;
	else
		return routePromise;
};

export function humanize(utils, config)
{
	var output = utils.devariable("run route #routeName#", config);

	return output;
};