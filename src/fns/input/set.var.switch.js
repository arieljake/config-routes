
export
default
function setVarSwitchfunction(state, config)
{
	var values;
	var lookup;
	var value;
	
	if (config.lookupVarName)
	{
		lookup = state.get(config.lookupVarName);
	}
	else if (config.lookupString)
	{
		lookup = state.translate(config.lookupString);
	}
	
	if (config.values)
	{
		values = config.values;
	}
	else if (config.valuesVarName)
	{
		values = state.get(config.valuesVarName);
	}
	
	if (lookup !== undefined)
		lookup = lookup.toString();
	
	if (values.hasOwnProperty(lookup))
		value = values[lookup];
	else
		value = config.defaultValue;
	
	state.set(config.saveTo, value);
};

export function humanize(utils, config) {

	var output;
	
	if (config.valueVarName)
	{
		output = utils.devariable("set #saveTo# based on lookup of #valueVarName#", config);
	}
	else if (config.valueString)
	{
		output = utils.devariable("set #saveTo# based on lookup of #valueString#", config);
	}
	
	return output;
};