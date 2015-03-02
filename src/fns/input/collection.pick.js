let _ = require("lodash");

export
default
function collectionPick(state, config)
{
	let collection = state.get(config.collectionVarName);
	let propertyNames = config.propertyNames;
	let value = _.map(collection, function(item)
	{
		return _.pick(item, propertyNames);
	});

	state.set(config.saveTo, value);

	if (config.deleteOriginal === true)
	{
		state.unset(config.collectionVarName);
	}
};