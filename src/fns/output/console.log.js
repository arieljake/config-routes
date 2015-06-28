export
default
function consoleLog(state, config) {

	let value;
	
	if (config.value)
	{
		value = config.value;
	}
	else if (config.valueString)
	{
		value = state.translate(config.valueString);
	}
	
	console.log(value);
};