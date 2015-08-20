let Q = require("q");
let util = require("util");

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
		var input;

		if (typeof config.input === "string")
		{
			input = state.get(config.input);
		}
		else
		{
			input = config.input;
		}

		routeContext.set("input", input);
	}
	
	if (config.inputs)
	{
		var input = routeContext.get("input") || {};

		Object.keys(config.inputs).forEach(function(key)
		{
			var value = config.inputs[key];

			if (typeof value === "string")
			{
				if (value[0] === "'" && value.substr(-1) === "'")
					input[key] = value.replace(/\'/g, "");
				else
					input[key] = state.get(value);
			}
			else
				input[key] = value;
		});
		
		routeContext.set("input", input);
	}

	var routePromise = route.run();

	if (config.output || config.outputs)
	{
		routePromise = routePromise.then(function()
		{
			var output = route.context.get("output");

			if (!output)
				return Q.reject("output expected but none defined: " + util.inspect(config.output));

			if (config.output)
			{
				state.set(config.output, output);
			}
			
			if (config.outputs)
			{
				Object.keys(config.outputs).map(function(outputKey)
				{
					var value = output[outputKey];
					var saveTo = config.outputs[outputKey];

					state.set(saveTo, value);
				});
			}
		});
	}

	if (config.fork === true)
		return undefined;
	else
		return routePromise.then(function()
		{
			return routeContext.get("output");
		});
};

export function humanize(utils, config)
{
	var output = utils.devariable("run route #routeName#", config);

	return output;
};