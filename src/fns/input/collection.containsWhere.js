let _ = require("lodash");

export
default
function containsWhere(state, config) {

    let collection = state.get(config.collectionVarName);
	let query = config.query || state.get(config.queryVarName);
	let value = _.findWhere(collection, query);
	
    state.set(config.saveTo, value !== undefined);
};