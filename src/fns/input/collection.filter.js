let _ = require("lodash");
let Filter = require("../../lib/Filter").Filter;

export
default
function collectionFilter(state, config)
{
	let collection = state.get(config.collectionVarName);
	let result = _.filter(collection, function(item)
	{
		return Filter.filter(item, config.filter, state);
	});

	state.set(config.saveTo, result);
};