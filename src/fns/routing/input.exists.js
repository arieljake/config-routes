export
default

function inputExists(state, config)
{
	var missingInputs = [];

	if (config.vars)
	{
		config.vars.forEach(function(varName)
		{
			var value = state.get(varName);

			if (value === undefined)
				missingInputs.push(varName);
		});
	}

	state.set(config.saveTo, missingInputs);
	
	if (config.throwOnError === true && missingInputs.length > 0)
	{
		return Q.reject({
			missingInputs: missingInputs
		});
	}
};

export function humanize(utils, config)
{
	var output = utils.devariable("validate input", config);

	return output;
};