export
default
function resSend(state, config) {

	let res = state.get(config.responseVarName);
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

export function humanize(utils, config) {
	
	var output;
	
	if (config.value)
	{
		output = utils.devariable("send #value#", config);
	}
	else if (config.valueVarName)
	{
		output = utils.devariable("send value at #valueVarName#", config);
	}
	
	return output;
};