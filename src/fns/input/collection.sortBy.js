let _ = require("lodash");

export
default
function sortBy(state, config)
{
	let collection = state.get(config.collectionVarName);
	let value = _.sortBy(collection, config.propertyName);

	if (config.saveTo)
		state.set(config.saveTo, value);

	return value;
};