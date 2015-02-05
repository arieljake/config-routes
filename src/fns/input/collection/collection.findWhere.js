var _ = require("lodash");

export
default
function findWhere(state, config) {

    var collection = state.get(config.collectionVarName);
	var query = state.get(config.queryVarName);
	var value = _.findWhere(collection, query);
	
    state.set(config.saveTo, value);
};