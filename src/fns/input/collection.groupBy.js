let _ = require("lodash");

export
default
function groupBy(state, config)
{
	let collection = state.get(config.collectionVarName);
	let value = _.groupBy(collection, config.propertyName);

	state.set(config.saveTo, value);

	if (config.deleteOriginal === true)
	{
		state.unset(config.collectionVarName);
	}
};