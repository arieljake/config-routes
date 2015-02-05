var VariableString = require("../../../utils/VariableString").VariableString;

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
	else if (config.valueString)
	{
		value = state.translate(config.valueString);
	}
	
	switch (config.format)
	{
		case "integer":
			value = parseInt(value, 10);
			break;
			
		case "string":
			value = value.toString();
			break;
	}
	
    state.set(config.saveTo, value);
};