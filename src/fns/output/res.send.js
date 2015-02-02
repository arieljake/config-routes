export
default
function resSend(state, config) {

	let res = state.get("res");
	let value;
	
	if (config.value)
	{
		value = config.value;
	}
	else if (config.valueVarName)
	{
		value = state.get(config.valueVarName);
	}
	
	res.send(value);
};