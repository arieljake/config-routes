let _ = require("lodash");
let ObjectPath = require("../../utils/ObjectPath").ObjectPath;

export
default
function pluck(state, config)
{
	let collection = state.get(config.collectionVarName);
	let path = new ObjectPath(config.propertyName);		
	let value = _.map(collection, function(item)
	{
		return path.getValueIn(item);
	});

	state.set(config.saveTo, value);

	if (config.deleteOriginal === true)
	{
		state.unset(config.collectionVarName);
	}
};