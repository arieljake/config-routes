let Q = require('q');
let async = require('async');
let _ = require('lodash');

export
default

function update(state, config)
{
	var deferred = Q.defer();
	var mongoDB = state.get(config.mongoVarName);
	var collection = config.collection;
	var query = state.get(config.queryVarName) || config.query || {};
	var update = state.get(config.updateVarName) || config.update || {};

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

	mongoDB.collection(collection).update(query, update, resultHandler);

	return deferred.promise;
};