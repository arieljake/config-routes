
let Q = require('q');

export
default
function getRecord(state, config) {

	var deferred = Q.defer();
	var mongoDB = state.get(config.mongoVarName);
	var collection = config.collection;
	var query = state.get(config.queryVarName) || config.query || {};
	var options = state.get(config.optionsVarName) || config.options || {};

	var resultHandler = function(err, items)
	{
		if (err)
		{
			state.set(config.saveErrorTo, err);
			deferred.reject(err);
		}
		else if (items.length > 1)
		{
			state.set(config.saveErrorTo, items.length + " items returned");
			deferred.reject(err);
		}
		else if (items.length === 0)
		{
			state.set(config.saveResultTo, null);
			deferred.resolve(null);
		}
		else
		{
			var result = items[0];
			state.set(config.saveResultTo, result);
			deferred.resolve(result);
		}
	};
	
	mongoDB.collection(collection).find(query, options).toArray(resultHandler);
	
	return deferred.promise;
};