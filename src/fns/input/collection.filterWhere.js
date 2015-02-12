let _ = require("lodash");

export
default
function filterWhere(state, config) {

    let collection = state.get(config.collectionVarName);
	let query = config.query || state.get(config.queryVarName);
	let value = _.filter(collection, function(item) {
		
		var found = _.findWhere([item],query);
		var result = (found !== undefined);
		
		if (config.invertCondition === true)
			result = !result;
		
		return result;
	});
	
    state.set(config.saveTo, value);
};