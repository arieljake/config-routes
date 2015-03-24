export
default
function runRoute(state, config)
{
	var routeLib = state.get(config.routeLibVarName);
	var routeName = state.translate(config.routeNameString);
	var route = routeLib.get(routeName);
	var req = state.get("req");
	var res = state.get("res");

	if (config.input)
	{
		Object.keys(config.input).map(function(inputKey)
		{
			var fullKey = "input." + inputKey;
			var valueVarName = config.input[inputKey];
			var value;
			
			if (valueVarName.length >= 2 && valueVarName.substr(0,1) == "'" && valueVarName.substr(-1) == "'")
			{
				value = valueVarName.substr(1,valueVarName.length-2);
			}
			else
			{
				value = state.get(valueVarName);
			}

			route.context.set(fullKey, value);
		});
	}

	var routePromise = route.run(req, res);

	if (config.output)
	{
		routePromise = routePromise.then(function()
		{
			Object.keys(config.output).map(function(outputKey)
			{
				var fullKey = "output." + outputKey;
				var saveTo = config.output[outputKey];
				var value = route.context.get(fullKey);

				state.set(saveTo, value);
			});

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