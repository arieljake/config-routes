let _ = require("lodash");
let ObjectPath = require("../../utils/ObjectPath").ObjectPath;

export
default
function collectionUnique(state, config)
{
	let collection = state.get(config.collectionVarName);
	let propPath;
	
	if (config.hasOwnProperty("propertyVarName"))
		propPath = new ObjectPath(config.propertyVarName);
	else
		propPath = null;
	
	let result = _.uniq(collection, function(item)
	{
		if (propPath)
			return propPath.getValueIn(item);
		else
			return item;
	});

	state.set(config.saveTo, result);
	
	return result;
};