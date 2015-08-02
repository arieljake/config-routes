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
	var query = config.query || state.get(config.queryVarName) || {};
	var update = config.update || state.get(config.updateVarName) || {};
	var options = config.options || state.get(config.optionsVarName) || {};

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

	try
	{
		if (options)
			mongoDB.collection(collection).update(query, update, options, resultHandler);
		else
			mongoDB.collection(collection).update(query, update, resultHandler);
	}
	catch (err)
	{
		deferred.reject(err);
	}

	return deferred.promise;
};