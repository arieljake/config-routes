let _ = require("lodash");

export
default
function findWhere(state, config) {

    let collection = state.get(config.collectionVarName);
	let query = config.query || state.get(config.queryVarName);
	let value = _.findWhere(collection, query);
	
	if (config.saveTo)
		state.set(config.saveTo, value);
	
	return value;
};