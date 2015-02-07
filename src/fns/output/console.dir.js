export
default
function consoleDir(state, config) {

	let value;
	
	if (config.value)
	{
		value = config.value;
	}
	else if (config.valueVarName)
	{
		value = state.get(config.valueVarName);
	}
	else if (config.valueString)
	{
		value = state.tranlsate(config.valueString);
	}
	
	console.dir(value);
};