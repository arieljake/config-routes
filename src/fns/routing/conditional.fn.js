let Q = require("q");

export
default
function conditionalFn(state, config)
{
	var routeLib = state.get("$routes");
	var value = state.get(config.valueVarName);
	
	if (config.invertValue === true)
		value = !value;
	
	if (value === true)
	{
		var fn = routeLib.getFn(config.fn);
		
		return fn(state, config.config);
	}
};

export function humanize(utils, config)
{
	var output = utils.devariable("conditional fn", config);

	return output;
};