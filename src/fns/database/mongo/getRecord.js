let Q = require('q');
let ObjectID = require('mongodb').ObjectID;

export
default
function getRecord(state, config) {

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
	
	mongoDB.collection(collection).findOne(query, options, resultHandler);
	
	return deferred.promise;
};