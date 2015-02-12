let _ = require("lodash");

export
default
function pluck(state, config)
{
	var collection = state.get(config.collectionVarName);
	var value = _.map(collection, function(item)
	{
		return item[config.propertyName];
	});

	state.set(config.saveTo, value);

	if (config.deleteOriginal === true)
	{
		state.unset(config.collectionVarName);
	}
};