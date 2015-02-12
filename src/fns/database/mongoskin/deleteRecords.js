
let Q = require('q');

export
default
function deleteRecords(state, config) {

	var deferred = Q.defer();
	var mongoDB = state.get(config.mongoVarName);
	var collection = config.collection;
	var query = config.query || state.get(config.queryVarName) || {};

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
	
	mongoDB.collection(collection).remove(query, resultHandler);
	
	return deferred.promise;
};