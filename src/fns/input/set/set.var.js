export
default
function setVar(state, config) {

    var value;

	if (config.value)
	{
		value = config.value;
	}
    else if (config.valueVarName)
	{
		value = state.get(config.valueVarName);
	}
	
    state.set(config.saveTo, value);
};