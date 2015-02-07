var MongoDbId = require('mongodb').ObjectID;

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
			
		case "boolean":
			value = (value == "true");
			break;
			
		case "mongoId":
			if (typeof value == "string")
				value = MongoDbId.createFromHexString(value);
			break;
	}
	
    state.set(config.saveTo, value);
};

export function humanize(utils, config) {

	var output;
	
	if (config.value)
	{		
		output = utils.devariable("set #saveTo# to '#value#'", config);
	}
    else if (config.valueVarName)
	{
		output = utils.devariable("copy #valueVarName# to #saveTo#", config);
	}
	else if (config.valueString)
	{
		output = utils.devariable("set #saveTo# as #valueString# from state", config);
	}
	
	return output;
};