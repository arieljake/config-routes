let _ = require("lodash");
let SetVars = require('./set.vars');

export
default
function map(state, config) {

    var collection = state.get(config.collectionVarName);
	var value = _.map(collection, function(item, index) {
		
		state.set(config.sourceKey, item);
		
		if (config.indexKey)
		{
			state.set(config.indexKey, index);
		}
		
		SetVars.default(state, config.map);
		
		var result = state.get(config.destKey);
		
		state.unset(config.sourceKey);
		state.unset(config.destKey);
		
		return result;
	});
	
    state.set(config.saveTo, value);
	
	if (config.deleteOriginal === true)
	{
		state.unset(config.collectionVarName);
	}
	
	return value;
};