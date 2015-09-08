let Q = require('q');

export
default
function aggregate(state, config) {

	let deferred = Q.defer();
	let mongoDB = state.get(config.mongoVarName);
	let collection = config.collection;
	let query = config.query || state.get(config.queryVarName);
	let pipeline = config.pipeline || state.get(config.pipelineVarName);
	let options = config.options || state.get(config.optionsVarName) || null;

	if (!pipeline)
	{
		deferred.reject("no pipeline defined");
	}
	else
	{
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

		mongoDB.collection(collection).aggregate(pipeline, options, resultHandler);
	}
	
	return deferred.promise;
};