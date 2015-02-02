
let Q = require('q');

export
default
function getRecords(state, config) {

	var deferred = Q.defer();
	var mongoDB = state.get(config.mongoVarName);
	var collection = config.collection;
	var query = state.get(config.queryVarName) || config.query || {};
	var options = state.get(config.optionsVarName) || config.options || {};

	var resultHandler = function(err, result)
	{
		if (err)
		{
			state.set(config.saveErrorTo, err);
			deferred.reject(err);
		}
		else
		{
			state.set(config.saveResultTo, result);
			deferred.resolve(result);
		}
	};
	
	mongoDB.collections(collection).find(query, options).toArray(resultHandler);
	
	return deferred.promise;
};