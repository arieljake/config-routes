let Q = require('q');

export
default
function aggregate(state, config) {

	let deferred = Q.defer();
	let mongoDB = state.get(config.mongoVarName);
	let collection = config.collection;
	let query = config.query || state.get(config.queryVarName);
	let steps = config.steps || state.get(config.stepsVarName) || [];

	if (query)
		steps.unshift({
			"$match": query
		});
	
	let resultHandler = function(err, result)
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
	
	mongoDB.collection(collection).aggregate(steps, resultHandler);
	
	return deferred.promise;
};