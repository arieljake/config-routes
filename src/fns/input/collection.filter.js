let _ = require("lodash");
let Filter = require("../../lib/Filter").Filter;

export
default
function collectionFilter(state, config)
{
	let collection = state.get(config.collectionVarName);
	let result = _.filter(collection, function(item)
	{
		return Filter.test(item, config.filter);
	});

	state.set(config.saveTo, result);
};